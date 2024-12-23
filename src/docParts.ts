import { Document, Packer, Paragraph, TextRun, ImageRun, HorizontalPosition, PageBreak, Alignment, UnderlineType, Numbering, Media } from "docx";
import sharp from 'sharp';
import * as fs from "fs";

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

const mappings = {
    
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
        children: [getTextRun(child)],
        numbering: listType ? {
            reference: getNumberingType(listType),
            level:0,
        } : undefined,
    })
}


function getTextRun(child:any){
    let wordChild = new TextRun({
            text: child.text,
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


export async function getImg(element:any){
    // const imgMetadata = await sharp(element.url).metadata();
    const base64Data = element.url.replace(/^data:image\/\w+;base64,/, '');
    // const base64Data = element.url;
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const metadata = await sharp(imageBuffer).metadata();
    const {width, height} = {width:metadata.width, height:metadata.height}
    console.log({width, height});
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