import { HtmlCreator } from "./htmlCreator";

export default class HrCreator implements HtmlCreator{
    generate(element: any): string {
        return `<hr>`;
    }
}   