import { Elysia, t } from "elysia";
import {swagger} from "@elysiajs/swagger";
import * as fs from "fs";
import {createTestDoc, createTestDocument, generateDocForTasks, generateDocForUserAnswers} from './utils';
import { Document, Packer, Paragraph, TextRun, ImageRun } from "docx";
import { PrismaClient, TaskTemplate, User, Task, Prisma } from '../prisma/client'
import sharp from 'sharp';
import { Answer } from "./interfaces";
import ScormGenerator from "./scormGenerator/scormGenerator";
import {writeFile} from "fs/promises"
import { existsSync } from 'fs';

import PCreator from "./scormGenerator/htmlMaper/pCreator";
import TableCreator from "./scormGenerator/htmlMaper/tableCreator";
import ImgCreator from "./scormGenerator/htmlMaper/imgCreator";
import PaintCreator from "./scormGenerator/htmlMaper/paintCreator";
import HeaderCreator from "./scormGenerator/htmlMaper/headerCreator";
import MathCreator from "./scormGenerator/htmlMaper/mathCreator";
import BlockquoteCreator from "./scormGenerator/htmlMaper/blockquoteCreator";
import HrCreator from "./scormGenerator/htmlMaper/hrCreator";
// import scormPackage from 'scorm-package';

const prisma = new PrismaClient() 



const app = new Elysia()
.use(swagger())
.get("/", async() => 
  {

  })

.get("/testDoc", async ()=>{
  // await createTestDoc(content);
  // return Bun.file(file);
  let json = require("./exampleData/editor.json");

  console.log('before doc')
  const doc = await createTestDocument(json["content"]);
  
  console.log('before buffer')
  const buffer:any = await Packer.toBuffer(doc);

  // await fs.writeFileSync("work.docx", buffer);
  // return Bun.file("work.docx");\
  console.log('after buffer');
  return new Response(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": 'attachment; filename="GeneratedDocument.docx"',
    },
  });
})

.get("/tasksDoc/:studyGroupId", async({params: {studyGroupId}}) => {
  const studyGroup = await prisma.studyGroup.findUnique({
    where: {
      id: studyGroupId,
    },
    select: {
      course: {
        select: {
          taskTemplates: {
            select: {
              id: true,
              name: true,
              tasks: true,
            }
          },
        },
      },
    },
  });

  const tasks = studyGroup?.course.taskTemplates.flatMap(taskTemplate => taskTemplate.tasks);
  console.log(tasks);
  if (tasks){
    const doc = await generateDocForTasks(tasks);
    const buffer:any = await Packer.toBuffer(doc);

    return new Response(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": 'attachment; filename="GeneratedDocument.docx"',
      },
    });
  }
  // return studyGroup?.course.taskTemplates[0];

})

.get("/userAnswersDoc/:userId", async({params: {userId}}) => {
  const answers = await prisma.userWorkAnswer.findMany({
    where:{
      userId: userId,
    },
    select:{
      user: true,
      task: true,
      answer: true,
      score: true,
    }
  });

  if (answers){
    const doc = await generateDocForUserAnswers(answers)
    
    const buffer:any = await Packer.toBuffer(doc);
    return new Response(buffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": 'attachment; filename="GeneratedDocument.docx"',
      },
    });

  }

},
{
  params: t.Object({
    userId: t.Number()
  })
}
)

.get("/testScormWithSections", async() => {
  const works = await prisma.work.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      course: true,
      workVariants: {
        select: {
          id: true,
          name: true,
          tasks: true,
        },
      },
      studyWork: {
        select: {
          workType: true,
        },
      },
    },
  });

  const workVariantsArrayFlatMap = works.flatMap(work => 
    work.workVariants.map(workVariant => ({
      name: `${work.name} ${workVariant.name}`,
      tasks: workVariant.tasks,
      workType: work.studyWork?.workType?.name || "Unknown",
      description: work.description,
      id: workVariant.id,
    }))
  );

  const finishArray = Object.entries(workVariantsArrayFlatMap.reduce((acc: any, work) => {
    const workType = work.workType || "Unknown";
    if (!acc[workType]) {
      acc[workType] = [];
    }
    acc[workType].push({
      name: work.name,
      description: work.description,
      tasks: work.tasks,
      id: work.id,
    });
    return acc;
  }, {})).map(([workType, works]) => ({ workType, works }));

  const scorm = new ScormGenerator("./scormData", finishArray);
  console.log('before generate');
  await scorm.generate();
  console.log('after generation');
  if (!existsSync("./scormPackage/scormcourse_v1.0.50_2025-03-11.zip")){
    return new Response("Error", {status: 500});
  }
  else{
    console.log('here');
    return Bun.file("./scormPackage/scormcourse_v1.0.50_2025-03-11.zip");
  }

})

.get("getScormForCourse/:courseId", async({params: {courseId}}) => {
  const works = await prisma.work.findMany({
    where:{
      courseId: courseId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      course: true,
      workVariants: {
        select: {
          id: true,
          name: true,
          tasks: true,
        },
      },
      studyWork: {
        select: {
          workType: true,
        },
      },
    },
  });

  const workVariantsArrayFlatMap = works.flatMap(work => 
    work.workVariants.map(workVariant => ({
      name: `${work.name} ${workVariant.name}`,
      tasks: workVariant.tasks,
      workType: work.studyWork?.workType?.name || "Unknown",
      description: work.description,
      id: workVariant.id,
    }))
  );

  const finishArray = Object.entries(workVariantsArrayFlatMap.reduce((acc: any, work) => {
    const workType = work.workType || "Unknown";
    if (!acc[workType]) {
      acc[workType] = [];
    }
    acc[workType].push({
      name: work.name,
      description: work.description,
      tasks: work.tasks,
      id: work.id,
    });
    return acc;
  }, {})).map(([workType, works]) => ({ workType, works }));

  const scorm = new ScormGenerator("./scormData", finishArray);
  console.log('before generate');
  await scorm.generate();
  console.log('after generation')

  if (!existsSync("./scormPackage/scormcourse_v1.0.50_2025-03-11.zip")){
    return new Response("Error", {status: 500});
  }
  else{
    console.log('here');
    return Bun.file("./scormPackage/scormcourse_v1.0.50_2025-03-11.zip");
  }
})


.listen({idleTimeout: 100, port: 3000});




console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
