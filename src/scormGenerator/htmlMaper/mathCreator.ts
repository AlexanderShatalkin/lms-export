import { Equation } from "../../interfaces";
import { HtmlCreator } from "./htmlCreator";

export default class MathCreator implements HtmlCreator{
    generate(element: Equation): string {
        return `<div class="equation">$$ ${element.texExpression} $$</div>`;
    }
}