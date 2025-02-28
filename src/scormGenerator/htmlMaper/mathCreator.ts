import { HtmlCreator } from "./htmlCreator";

export default class MathCreator implements HtmlCreator{
    generate(element: any): string {
        return `<div>$$ ${element.texExpression} $$</div>`;
    }
}