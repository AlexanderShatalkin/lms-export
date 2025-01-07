import { WidthType, TableCell,Table, TableRow, Packer, Paragraph, TextRun, ImageRun,
     HorizontalPosition, PageBreak, Alignment, UnderlineType, Numbering, MathRun, Math as DocxMath, Header, HeadingLevel, 
     BorderStyle} from "docx";
import sharp from 'sharp';
import * as fs from "fs";
import { getPaintImg, getImageDimensions } from "./imageGeneration";


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




function mapHexToHighlight(hexColor: string): string | undefined {
    const colorMapping: { [key: string]: string } = {
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

    return colorMapping[hexColor.toUpperCase()] || undefined;
}


function getP(child:any, listType:string){

    return new Paragraph({
        children: [...getTextRun(child)],
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

    children.forEach(child => {
        let wordChild = getP(child, listType)
        wordChildren.push(wordChild);
    });

    return wordChildren;
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
        }
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
        }
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