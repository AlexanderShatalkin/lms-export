import { WidthType, TableCell,Table, TableRow, Packer, Paragraph, TextRun, ImageRun,
     HorizontalPosition, PageBreak, Alignment, UnderlineType, Numbering, MathRun, Math as DocxMath, Header, HeadingLevel, 
     BorderStyle, SectionType } from "docx";
import sharp from 'sharp';
import * as fs from "fs";
import { getPaintImg, getImageDimensions } from "./imageGeneration";
import { Score, Task, User, UserWorkAnswer } from "../prisma/client";
import {Answer} from "./interfaces";

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


export function createP(paragraph:any){
    return new Paragraph(paragraph);
}



function getNumberingType(listStyleType:string): string{
    const listStyleTypes: {[key:string]: string} = {
        "disc": "bulletList",
        "decimal": "numberedList",
    }

    return listStyleTypes[listStyleType] || "bulletList";
}

type HeadingLevelType = typeof HeadingLevel[keyof typeof HeadingLevel];

function getHeaderLevel(header:string): HeadingLevelType  | undefined{
    const listHeaderTypes: {[key:string]: HeadingLevelType} ={
        "h1": HeadingLevel.HEADING_1,
        "h2": HeadingLevel.HEADING_2,
        "h3": HeadingLevel.HEADING_3,
        "h4": HeadingLevel.HEADING_4,
        "h5": HeadingLevel.HEADING_5,
        "h6": HeadingLevel.HEADING_6,
    }    

    return listHeaderTypes[header] || undefined
}




function mapHexToHighlight(hexColor: string): "none" | "black" | "blue" | "cyan" | "darkBlue" | "darkCyan" | "darkGray" | "darkGreen" | "darkMagenta" | "darkRed" | "darkYellow" | "green" | "lightGray" | "magenta" | "red" | "white" | "yellow" | undefined {
    const colorMapping: { [key: string]: "none" | "black" | "blue" | "cyan" | "darkBlue" | "darkCyan" | "darkGray" | "darkGreen" | "darkMagenta" | "darkRed" | "darkYellow" | "green" | "lightGray" | "magenta" | "red" | "white" | "yellow" } = {
        "#FFFF00": "yellow",
        "#00FFFF": "cyan",
        "#00FF00": "green",
        "#FF0000": "red",
        "#FE0000": "red",
        "#FF00FF": "magenta",
        "#0000FF": "blue",
        "#FFFFFF": "white",
        "#000000": "black",
    };

    return colorMapping[hexColor.toUpperCase()] || "none";  // Возвращаем "none" по умолчанию
}

function getP(children:any, listType:string){

    const textRuns:any[] = [];
    children.forEach((child:any) => {
        console.log(...getTextRun(child));
        textRuns.push(...getTextRun(child));
    });


    return new Paragraph({
        children: textRuns,
        numbering: listType ? {
            reference: getNumberingType(listType),
            level:0,
        } : undefined,
    })
}

function getTextRun(child:any){
    const lines = child.text.split("\n");
    return lines.map((line: string, index: number) => {
    const  wordChild = new TextRun({
            break: index > 0 ? 1: 0,
            text: line,
            bold: child.bold ? true : false,
            italics: child.italic ? true : false,
            underline: {
                type: child.underline ? UnderlineType.SINGLE : UnderlineType.NONE,
                color: "000000",
            }, 
            strike: child.strikethrough ? true : false,
            superScript: child.superscript ? true: false,
            subScript: child.subscript ? true: false,
            color: child.color ? child.color : "000000",
            highlight : mapHexToHighlight(child.backgroundColor || "#FFFFFF"),
    })
    return wordChild;
    })
}


export function getPWordElement(element:any){
    const wordChildren:Array<any> = [];
    const children:any[] = element.children;
    const listType = element.listStyleType;

    // children.forEach(child => {
    //     let wordChild = getP(, listType)
    //     wordChildren.push(wordChild);
    // });
    console.log(children);

    return [getP(children, listType)];
}


export async function getImg(element:any){
    const base64Data = element.url.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const metadata = await sharp(imageBuffer).metadata();
    const {width, height} = {width:metadata.width, height:metadata.height}
    const image = new ImageRun({
        data: imageBuffer,
        transformation:{
            width: width || 0,
            height: height || 0,
        },
        type: 'jpg'
    })
    return [new Paragraph({
        children: [image],
    })]
}



export function createTitle(paragraph: string){
    return new Paragraph({
        alignment: 'center',
        children: [
            new TextRun({
                text: paragraph,
                size: 32,
            })
        ]
    })
}


export async function getHeader(element:any){
    const children:any[] = []
    element.children.forEach((child:any) => {
        children.push(...getTextRun(child))
    });
    return [
        new Paragraph({
            children: children,
            heading: getHeaderLevel(element.type),
        })
    ];
}

export async function getBlockquote(element: any){
    const children:any[] = []
    element.children.forEach((element:any) => {
        const quoteElement = element;
        quoteElement.italic = true;
        children.push(...getTextRun(quoteElement));
    });
    return [
        new Paragraph({
            indent: {left:720, right: 720},
            children:children,
        })
    ];
}

export async function getPaint(element:any){
    const data = element.data;
    const buffer = await getPaintImg(data);
    
    const size = getImageDimensions(data);

    const maxWidth = 600;  
    const maxHeight = 800; 

    let scaleFactor = 1;
    if (size.width > maxWidth || size.height > maxHeight) {
        const widthScale = maxWidth / size.width;
        const heightScale = maxHeight / size.height;
        scaleFactor = Math.min(widthScale, heightScale); 
    }

    // Calculate new width and height based on scale factor
    const newWidth = size.width * scaleFactor;
    const newHeight = size.height * scaleFactor;

    const image = new ImageRun({
        data: buffer,
        transformation:{
            width: newWidth,
            height: newHeight,
        },
        type: 'jpg'
    });

    return [new Paragraph({
        children: [image],
    })]

}

export function getEquation(element:any){
    return [new Paragraph({
        children: [new DocxMath({
            children: [
                new MathRun(element.texExpression)
            ]
    })]
    })]
}

function getTr(element:any){
    const cells:any[] = []
    element.children.forEach((td:any) => {
        cells.push(getTd(td));
    });
    return new TableRow({
        children: cells,
    })
}

function getTd(element:any){
    const paragraphs:any[] = []
    element.children.forEach((e:any) => {
        paragraphs.push(...getPWordElement(e));
    });
    return new TableCell({
        children: paragraphs,
    })
}

export function getTable(element:any){
    const rows:any[] = []
    element.children.forEach((row:any) => {
        rows.push(getTr(row));
    });
    return [new Table({
        rows: rows,
        width: {
            size: 100,
            type: WidthType.PERCENTAGE,
        },
    })]
}   

export function getHorizontalRule(element:any){
    return [new Paragraph({
        border: {
            top:{ 
                style: BorderStyle.SINGLE,
                size: 6,
                space: 1,
            }
        }
    })];
}

export async function getSectionForTask(task:Task){
    const section = [new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [
            new TextRun({
                text: task.name,
            })
        ]
    })]
    const content = (task.content as Record<string, any>).content;
    for(const element of content){
        if (mapping[element.type]){
            const result = await mapping[element.type](element)
            section.push(...result)
        }
    }


    return section;
    console.log(section)
}




export async function getSectionForAnswer(answer: Answer){
    const section = await getSectionForTask(answer.task);
    section.push(...getHorizontalRule(""));
    
    if (answer.score){
        section.push(new Paragraph({
            children:[
                new TextRun(answer.score.value.toString()),
            ]
        }));
    }
    else{
        section.push(new Paragraph({
            children: [new TextRun("не оценено")]
        }))
    }

    if (answer.answer){

        const content = (answer.answer as Record<string, any>).content;

        for(const element of (content || [])){

            if (mapping[element.type]){
                const result = await mapping[element.type](element)
                section.push(...result)
            }
        }
    }

    return section;
}