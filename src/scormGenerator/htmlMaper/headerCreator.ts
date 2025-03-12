import { Paragraph, TaskContentElement } from "../../interfaces";
import { HtmlCreator } from "./htmlCreator";
import PCreator from "./pCreator";

export default class HeaderCreator implements HtmlCreator{
    generate(element: Paragraph): string {
        const pCreator = new PCreator();
        return `<${element.type}>${pCreator.generate(element)}</${element.type}>`;
    }
}