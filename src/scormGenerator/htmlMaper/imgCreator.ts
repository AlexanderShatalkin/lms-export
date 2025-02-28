import { HtmlCreator } from "./htmlCreator";

export default class ImgCreator implements HtmlCreator{
    generate(element: any): string {
        return `<img src="${element.url}" style="width: 100%; height: auto;">`;
    }
}