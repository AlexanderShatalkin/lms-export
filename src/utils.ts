import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun, ImageRun, HorizontalPosition, PageBreak, Numbering } from "docx";
import sharp from 'sharp';
import {Work} from './interfaces'
import {createP, createTitle, getPWordElement, getImg, getEquation, getTable} from './docParts'

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

type MappingFunction = (element: any) => any;

const mapping: { [key: string]: MappingFunction } = {};

mapping["p"] = (element:any) => getPWordElement(element);
mapping["img"] = (element: any) => getImg(element);
mapping["equation"] = (element: any) => getEquation(element);
mapping["table"] = (element: any) => getTable(element);


export async function createTestDocument(elements:any[]){
    const paragraphs:any[] = [];
    
    for (const element of elements){
        if (mapping[element.type]){
            console.log(element.type)
            const result = await mapping[element.type](element)
            console.log(element.type)
            paragraphs.push(...result)
            console.log(element.type)
        }
    };

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

    return doc

}

