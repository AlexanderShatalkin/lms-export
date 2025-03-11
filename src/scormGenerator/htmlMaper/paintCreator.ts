import { HtmlCreator } from "./htmlCreator";
import { getPaintImg, getImageDimensions } from "../../imageGeneration";

export default class PaintCreator implements HtmlCreator{
    async generate(element: any): Promise<string> {
        const data = element.data;
        const buffer = await getPaintImg(data);
        const size = getImageDimensions(data);
        return `<img src="data:image/png;base64,${buffer.toString('base64')}" style="width: ${size.width}; height: ${size.height};">`;
    }
}