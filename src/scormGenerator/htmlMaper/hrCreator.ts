import { Hr, TaskContentElement } from "../../interfaces";
import { HtmlCreator } from "./htmlCreator";

export default class HrCreator implements HtmlCreator{
    generate(element: Hr): string {
        return `<hr>`;
    }
}   