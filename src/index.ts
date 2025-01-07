import { Elysia, t } from "elysia";
import * as fs from "fs";
import {createWordDocumentForGroupWorks, createTestDoc, createTestDocument} from './utils';
import { Document, Packer, Paragraph, TextRun, ImageRun } from "docx";
import { PrismaClient } from '../prisma/client'
import sharp from 'sharp';

const prisma = new PrismaClient() 

const app = new Elysia()
.get("/", async() => 
  {

  })

.get("/studyGroup", async() => {
  const studyGroups = await prisma.studyGroup.findMany({});
  return studyGroups;
})

.get("/work", async() =>{
  const works = await prisma.work.findMany({});
  return works;
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

.get("/testWord", async({set}) => {
    const content = [];
    for (let i = 0; i < 100; i++){
      content.push(i.toString());
    }



    const file:any = 'test.docx'
    await createTestDoc(content);
    return Bun.file(file);


})

.get("/getWorks/:studyGroupId", async({params:{studyGroupId}}) =>{

  const worksVariants = await prisma.workVariant.findMany({
    where:{
      work: {
        studyGroupId: studyGroupId,
      },
    },
    include: {
      tasks: true,
      work:{
        select:{
          name: true,
        },
      },
    },
  });


  const tasks:any = [];
  console.log(worksVariants)
  worksVariants.forEach(work =>{
    const workTasks:any = [];
    work.tasks.forEach(task => {
      workTasks.push({task: task.name, content: task.content});
    });
    tasks.push({work: work.work.name, tasks: workTasks})
  })
  console.log('before creation')
  const doc = await createWordDocumentForGroupWorks(tasks);
  const buffer:any = await Packer.toBuffer(doc);

  await fs.writeFileSync("work.docx", buffer);




  console.log('after creation')
  // ctx.header('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  // ctx.header('Content-Disposition', 'attachment; filename=document.docx');
  // ctx.body = buffer;
  return Bun.file("work.docx");
},
{
  params: t.Object({
    studyGroupId: t.String()
  })
})

.get("/testText", async ()=>{
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

.listen({idleTimeout: 100, port: 3000});




console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
