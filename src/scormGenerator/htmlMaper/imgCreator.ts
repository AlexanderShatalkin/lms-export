import { Image, TaskContentElement } from "../../interfaces";
import { HtmlCreator } from "./htmlCreator";
import sharp from "sharp";
import fetch from 'node-fetch';

export default class ImgCreator implements HtmlCreator{
    async generate(element: Image): Promise<string> {
        let imageBuffer;

        if (element.url.startsWith('data:image/')) {
            const base64Data = element.url.replace(/^data:image\/\w+;base64,/, '');
            imageBuffer = Buffer.from(base64Data, 'base64');
        } else if (element.url.startsWith('http')) {
            const response = await fetch(element.url);
            if (!response.ok) {
                throw new Error(`Ошибка загрузки изображения: ${response.statusText}`);
            }
            imageBuffer = await response.buffer();
        } else {
            throw new Error('Неподдерживаемый формат изображения');
        }

        
        const metadata = await sharp(imageBuffer).metadata();
        const {width, height} = {width:metadata.width, height:metadata.height}
        
        return `<img src="${element.url}" style="width: ${width || "100%"}px; height: ${height || "auto"}px;">`;


    }
}