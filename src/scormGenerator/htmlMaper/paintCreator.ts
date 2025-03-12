import { HtmlCreator } from "./htmlCreator";
import { getPaintImg, getImageDimensions } from "../../imageGeneration";
import { Paint } from "../../interfaces";

export default class PaintCreator implements HtmlCreator{
    async generate(element: Paint): Promise<string> {
        const data = element.data;
        const buffer = await getPaintImg(data);
        const size = getImageDimensions(data);
        return `<img src="data:image/png;base64,${buffer.toString('base64')}" style="width: ${size.width}; height: ${size.height};">`;
    }
}