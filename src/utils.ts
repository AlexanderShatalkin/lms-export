import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun, ImageRun, HorizontalPosition, PageBreak } from "docx";
import sharp from 'sharp';
import {Work} from './interfaces'
import {createP, createTitle, createParagraphParts} from './docParts'

const docElements:any[] = []



async function prepareDocElementsForWork(work:Work){
    const docElements:any[] = [];
    docElements.push(createTitle(work.work));
    console.log(work)
    work.tasks.forEach(task =>{
        docElements.push(createP(task.task));
        task.content.content.forEach(element => {

            if (element.type === "p"){

                element.children.forEach(child => {
                    docElements.push(createP(child.text));
                });
            }
        });
    })
    return docElements;
}

export async function createWordDocumentForGroupWorks(tasksContent:Work[]){
    let docElements:any[] = [];
    for (const work of tasksContent){
        
        docElements = docElements.concat(await prepareDocElementsForWork(work));
        docElements.push(
            new Paragraph({
                children: [new PageBreak()],
            }),
        )
    }
    const doc = new Document({
        sections:[
            {
                children:docElements,
            },
        ],
    });
    return doc;
}


export async function createTestDoc(content:string[]){
    const docElements:any[] = [];
    content.forEach(element => {
        docElements.push(createP(element)); 
           
    });
    
    const doc = new Document({
        sections:[
            {
                children: docElements,
            }
        ]
    });

    console.log('before creaion')
    
    const buffer:any = await Packer.toBuffer(doc);
    await fs.writeFileSync("test.docx", buffer);

    
    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync("test.docx", buffer);
    });
}

export async function createTestDocument(element:any){
    let paragraph = createParagraphParts(element);

    const paragraphs = [paragraph];

    const doc = new Document({
        sections:[
            {
                children: paragraphs,
            }
        ]
    });
    console.log('here');

    return doc

}

