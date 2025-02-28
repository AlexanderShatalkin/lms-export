import { HtmlCreator } from "./htmlCreator";
import PCreator from "./pCreator";

export default class HeaderCreator implements HtmlCreator{
    generate(element: any): string {
        const pCreator = new PCreator();
        return `<${element.type}>${pCreator.generate(element)}</$${element.type}>`;
    }
}