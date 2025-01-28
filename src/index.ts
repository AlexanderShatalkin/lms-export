import { Elysia, t } from "elysia";
import {swagger} from "@elysiajs/swagger";
import * as fs from "fs";
import {createTestDoc, createTestDocument, generateDocForTasks, generateDocForUserAnswers} from './utils';
import { Document, Packer, Paragraph, TextRun, ImageRun } from "docx";
import { PrismaClient, TaskTemplate, User, Task, Prisma } from '../prisma/client'
import sharp from 'sharp';
import { Answer } from "./interfaces";


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

.get("/getWorks/:studyGroupId", async({params:{studyGroupId}}) =>{

},
{
  params: t.Object({
    studyGroupId: t.String()
  })
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




.listen({idleTimeout: 100, port: 3000});




console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
