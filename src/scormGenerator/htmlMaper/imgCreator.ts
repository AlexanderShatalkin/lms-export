import { Image, TaskContentElement } from "../../interfaces";
import { HtmlCreator } from "./htmlCreator";
import sharp from "sharp";

export default class ImgCreator implements HtmlCreator{
    async generate(element: Image): Promise<string> {
            const base64Data = element.url.replace(/^data:image\/\w+;base64,/, '');
            const imageBuffer = Buffer.from(base64Data, 'base64');
        
            const metadata = await sharp(imageBuffer).metadata();
            const {width, height} = {width:metadata.width, height:metadata.height}
        
        return `<img src="${element.url}" style="width: ${width || "100%"}px; height: ${height || "auto"}px;">`;


    }
}