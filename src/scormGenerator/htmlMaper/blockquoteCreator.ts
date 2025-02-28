import { HtmlCreator } from "./htmlCreator";
import PCreator from "./pCreator";

export default class BlockquoteCreator implements HtmlCreator{
    generate(element: any): string {
        const pCreator = new PCreator();
        return `<blockquote>${pCreator.generate(element)}</blockquote>`;
    }
}