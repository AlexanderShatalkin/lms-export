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

.get("/studyGroup", async() => {
  const studyGroups = await prisma.studyGroup.findMany({
    select: {
      id: true,
      name: true,
      studyGroupMembers: {
        select: {
          initiator: true,
        }
      },
    }
  });
  return studyGroups;
})

.get("/work", async() =>{
  const works = await prisma.work.findMany({});
  return works;
})

.get("/studyGroupWorks/:id", async({params:{id}}) => {
  const works = await prisma.studyGroup.findUnique({
    where: {
      id: id,
    },
    select: {
      studyWorks: true,
    }
  })

  return works;
})

.get("/studyGroupCourse/:id", async({params: {id}}) => {
  const course = await prisma.studyGroup.findUnique({
    where: {
      id: id,
    },
    select: {
      course: true,
    }
  })

  return course;
})

.get("/studyGroupCourseTasks/:id", async({params: {id}}) => {
  const tasks = await prisma.studyGroup.findUnique({
    where: {
      id: id,
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

  return tasks;
})

.get("work/:id", async({params: {id}}) => {
  const work = await prisma.work.findUnique({
    where: {
      id: id,
    },
    select: {
      
    }
  })

  return work;
})


.get("/getActivitiesBords", async() => {
  const activiites = await prisma.activityBoard.findMany();
  return activiites;
})

.get("getUserWorkAnswers", async() => {
  const answers = await prisma.userWorkAnswer.findMany();
  return answers;
})

.get("getGroupAnswers/:studyGroupId", async({params: {studyGroupId}}) => {
  // const studyGroup = await prisma.studyGroup.findUnique({
  //   where: {
  //     id: studyGroupId,
  //   },
  //   select: {
  //     course: {
  //       select: {
  //         taskTemplates: {
  //           select: {
  //             id: true,
  //             name: true,
  //             tasks: {
  //               select:{
  //                 userAnswers: true,
  //               }
  //             },
  //           }
  //         },
  //       },
  //     },
  //   },
  // });

  const answers = await prisma.userWorkAnswer.findMany({
    where: {
      user: {
        studyGroup: {
          some: {
            id: studyGroupId,
          }
        }
      }
    }
  })
  return answers;

})

.get("/users", async() => {
  return await prisma.user.findMany({
    select:{
      id: true,
      role: true,
      studyGroup: true,
      studyGroupMember: true,
    }
  });
})

.get("/studyWork/:id",  async({params:{id}}) => {
  const work = await prisma.studyWork.findUnique({
    where:{
      id: id
    },
  })

  return work;
})

.get("/taskTemplate", async() => {
  const taskTemplate = await prisma.taskTemplate.findMany({});
  return taskTemplate;
})

.get("/task", async()=>{
  const tasks = await prisma.task.findMany({});
  return tasks;
})

.get("/workTemplate", async () => {
  const workTemplates = await prisma.workTemplate.findMany();
  return workTemplates;
})

.get("/workVariant", async() =>{
  const works = await prisma.workVariant.findMany({});
  return works;
})

.get("/workVariantType", async() =>{
  const works = await prisma.workVariantType.findMany({});
  return works;
})

.get("/:id", async ({params: {id}}) => {
  const group = await prisma.studyGroup.findFirstOrThrow({
    where: {
      id: id,
    }
  });
  return group
},
{
  params: t.Object({
    id: t.String()
  })
}
)

.get("/getCourseWorks/:courseId", async({params: {courseId}}) => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      name: true,
      works: {
        include: {
          workVariants: {
            include: {
              tasks: true,
            },
          },
        },
      },
    },
  });

  return course;
})

.get("/getCourses", async() => {
  const courses = await prisma.course.findMany();
  return courses;
})

.get("/getWorks", async() => {
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
    });
    return acc;
  }, {})).map(([workType, works]) => ({ workType, works }));


  return finishArray
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

.get("testScorm", async() => {
  const works = await prisma.workVariant.findMany({
    select:{
      id: true,
      name: true,
      tasks: true,
    }
  });
  const course = {works: works};

  const scorm = new ScormGenerator("./scormData", course);
  console.log('before generate');
  await scorm.generate();
  console.log('after generation')
  return works;
})

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
  console.log('after generation')
  return works;

})

.get("/testHtml", async() => {
  let json = require("./exampleData/editor.json");
  let content = json["content"];
  const pCreator = new PCreator();
  let html = "";
  for(const child of content){
    if (child.type === "p"){
      html += await pCreator.generate(child);
    }
  }
  await writeFile("./test.html", html);
  return html;
})

.get("/htmlTable", async() => {
  let json = require("./exampleData/editor.json");
  let content = json["content"];
  const tableCreator = new TableCreator();
  let html = "";
  for(const child of content){
    if (child.type === "table"){
      html += await tableCreator.generate(child);
    }
  }
  await writeFile("./test.html", html);
  return html;
})

.get("htmlImg", async() => {
  let json = require("./exampleData/editor.json");
  let content = json["content"];
  const imgCreator = new ImgCreator();
  let html = "";
  for(const child of content){
    if (child.type === "img"){
      html += await imgCreator.generate(child);
    }
  }
  await writeFile("./test.html", html);
  return html;

})

.get("htmlPaint", async() => {
  let json = require("./exampleData/editor.json");
  let content = json["content"];
  const paintCreator = new PaintCreator();
  let html = "";
  for(const child of content){
    if (child.type === "paint"){
      html += await paintCreator.generate(child);
    }
  }
  await writeFile("./test.html", html);
  return html;
})

.get("htmlHeader", async() => {
  let json = require("./exampleData/editor.json");
  let content = json["content"];
  const headerCreator = new HeaderCreator();
  let html = "";
  for(const child of content){
    if (child.type === "h2"){
      html += await headerCreator.generate(child);
    }
  }
  await writeFile("./test.html", html);
  return html;

})

.get("html", async() => {
  let json = require("./exampleData/editor.json");
  let content = json["content"];
  const hrCreator = new HrCreator();
  let html = "";
  for(const child of content){
    if (child.type === "hr"){
      html += await hrCreator.generate(child);
    }
  }
  await writeFile("./test.html", html);
  return html;
})


.listen({idleTimeout: 100, port: 3000});




console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
