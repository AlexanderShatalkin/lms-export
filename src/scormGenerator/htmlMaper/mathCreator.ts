import { HtmlCreator } from "./htmlCreator";

export default class MathCreator implements HtmlCreator{
    generate(element: any): string {
        return `<div class="equation">$$ ${element.texExpression} $$</div>`;
    }
}