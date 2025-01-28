import * as fs from "fs";
import { Document, Packer, Paragraph, TextRun, ImageRun, HorizontalPosition, PageBreak, Numbering } from "docx";
import sharp from 'sharp';
import {createP, createTitle, getPWordElement, getImg, getEquation, getTable, getPaint, getHeader, getBlockquote, getHorizontalRule, getSectionForTask, getSectionForAnswer} from './docParts'
import styles from "./styles";
import { Task, UserWorkAnswer } from "../prisma/client";
import { Answer } from "./interfaces";

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


// async function prepareDocElementsForWork(work:Work){
//     const docElements:any[] = [];
//     docElements.push(createTitle(work.work));
//     console.log(work)
//     work.tasks.forEach(task =>{
//         docElements.push(createP(task.task));
//         task.content.content.forEach(element => {

//             if (element.type === "p"){

//                 element.children.forEach(child => {
//                     docElements.push(createP(child.text));
//                 });
//             }
//         });
//     })
//     return docElements;
// }

// export async function createWordDocumentForGroupWorks(tasksContent:Work[]){
//     let docElements:any[] = [];
//     for (const work of tasksContent){
        
//         docElements = docElements.concat(await prepareDocElementsForWork(work));
//         docElements.push(
//             new Paragraph({
//                 children: [new PageBreak()],
//             }),
//         )
//     }
//     const doc = new Document({
//         sections:[
//             {
//                 children:docElements,
//             },
//         ],
//     });
//     return doc;
// }


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

}

type MappingFunction = (element: any) => any;

const mapping: { [key: string]: MappingFunction } = {};

mapping["p"] = (element:any) => getPWordElement(element);
mapping["img"] = (element: any) => getImg(element);
mapping["equation"] = (element: any) => getEquation(element);
mapping["table"] = (element: any) => getTable(element);
mapping["paint"] = (element: any) => getPaint(element);
mapping["h1"] = mapping["h2"] = mapping["h3"] = mapping["h4"] = mapping["h5"] = mapping["h6"] = (element: any) => getHeader(element);
mapping["blockquote"] = (element: any) => getBlockquote(element);
mapping["hr"] = (element: any) => getHorizontalRule(element);

export async function createTestDocument(elements:any[]){
    const paragraphs:any[] = [];
    
    for (const element of elements){
        if (mapping[element.type]){
            const result = await mapping[element.type](element)
            paragraphs.push(...result)
        }
    };

    const doc = new Document({
        styles:styles,
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


export async function generateDocForTasks(tasks:Task[]){
    
    const sections = [];

    for (const task of tasks) {
        const paragraphs = await getSectionForTask(task); 
        sections.push({
            properties: {}, 
            children: paragraphs, 
        });
    }

    const doc = new Document({
        styles:styles,
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
        sections:sections,
    });

    return doc
}

export async function generateDocForUserAnswers(userAnswers: any[]){
    const sections = [];
    for (const answer of userAnswers) {
        const paragraphs = await getSectionForAnswer(answer); 
        sections.push({
            properties: {}, 
            children: paragraphs, 
        });
    }

    const doc = new Document({
        styles:styles,
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
        sections:sections,
    });

    return doc;

}