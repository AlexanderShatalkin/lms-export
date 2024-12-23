import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun, ImageRun, HorizontalPosition, PageBreak, Numbering } from "docx";
import sharp from 'sharp';
import {Work} from './interfaces'
import {createP, createTitle, createParagraphParts, createListItem} from './docParts'

const docElements:any[] = []


const bulletNumbering = new Numbering({
    config: [
        {
            reference: "bulletList",
            levels: [
                {
                    level: 0,
                    format: "bullet",
                    text: "•",
                    alignment: "left",
                },
            ],
        },
    ],
});

const decimalNumbering = new Numbering({
    config: [
        {
            reference: "numberedList",
            levels: [
                {
                    level: 0,
                    format: "decimal", 
                    text: "%1.",       
                    alignment: "left",
                },
            ],
        },
    ],
});


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

    
    // Packer.toBuffer(doc).then((buffer) => {
    //     fs.writeFileSync("test.docx", buffer);
    // });
}

export async function createTestDocument(elements:any[]){
    let paragraph;
    const paragraphs:any[] = [];
    elements.forEach(element => {
        if (element.type == "p")
            if (element.listStyleType)
                paragraphs.push(...createListItem(element.children, element.listStyleType))
            else    
                paragraphs.push(...createParagraphParts(element.children));
    });

    const doc = new Document({
        numbering: {
            config: [
                {
                    reference: "bulletList",
                    levels: [
                        {
                            level: 0,
                            format: "bullet",
                            text: "•",
                            alignment: "left",
                        },
                    ],
                },
                {
                    reference: "numberedList",
                    levels: [
                        {
                            level: 0,
                            format: "decimal",
                            text: "%1.",
                            alignment: "left",
                        },
                    ],
                },
            ],
        },
        sections:[
            {
                children: paragraphs,
            }
        ]
    });
    console.log('here');

    return doc

}

