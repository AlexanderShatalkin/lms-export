import { Document, Packer, Paragraph, TextRun, ImageRun, HorizontalPosition, PageBreak, Alignment, UnderlineType } from "docx";
import sharp from 'sharp';
import * as fs from "fs";

export function createP(paragraph:any){
    return new Paragraph(paragraph);
}

function createWordChild(child:any){
    let wordChild = 
    new Paragraph({ children: 
        [new TextRun({
            "text": child.text,
            "bold": child.bold ? true : false,
            "italics": child.italic ? true : false,
            "underline": {
                type: child.underline ? UnderlineType.SINGLE : UnderlineType.NONE,
                color: "000000",
            } 
        })],
    });
    console.log(wordChild);

    return wordChild;

}

export function createParagraphParts(children:Array<any>){
    let wordChildren:Array<any> = [];


    children.forEach(child => {
        let wordChild = createWordChild(child)
        wordChildren.push(new TextRun(wordChild));
    });

    return new Paragraph({
        children:wordChildren
    })

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
            width: width,
            height: height,
        }
    })
    return new Paragraph({
        children: [image],
    })

}