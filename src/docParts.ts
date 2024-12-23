import { Document, Packer, Paragraph, TextRun, ImageRun, HorizontalPosition, PageBreak, Alignment, UnderlineType, Numbering } from "docx";
import sharp from 'sharp';
import * as fs from "fs";

export function createP(paragraph:any){
    return new Paragraph(paragraph);
}



function getNumberingType(listStyleType:string): string{
    console.log(listStyleType);
    const listStyleTypes: {[key:string]: string} = {
        "disc": "bulletList",
        "decimal": "numberedList",
    }

    // console.log(listStyleTypes[listStyleType] || "");
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

function getParagraph(child:any){
    return new Paragraph({children: [getTextRun(child)] });
}   

function getListItem(child:any, listType:string){
    return new Paragraph({
        children: [getTextRun(child)],
        numbering:{
            reference: getNumberingType(listType),
            level:0,
        }
    })
}


function getTextRun(child:any){
    console.log(child)
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

export function createParagraphParts(children:Array<any>){
    let wordChildren:Array<any> = [];


    children.forEach(child => {
        console.log('here');
        let wordChild = getParagraph(child)
        wordChildren.push(wordChild);
    });

    return wordChildren;

}

export function createListItem(children:Array<any>, type:string){
    let wordChildren:Array<any> = [];


    children.forEach(child => {
        console.log('here');
        let wordChild = getListItem(child, type)
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


async function createImg(imgUrl:any){
    const imgMetadata = await sharp(imgUrl).metadata();
    const {width, height} = {width:imgMetadata.width, height:imgMetadata.height}
    console.log({width, height});
    const img = fs.readFileSync(imgUrl)
    const image = new ImageRun({
        data: img,
        transformation:{
            width: width || 0,
            height: height || 0,
        }
    })
    return new Paragraph({
        children: [image],
    })

}