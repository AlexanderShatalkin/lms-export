import { Blockquote, TaskContentElement } from "../../interfaces";
import { HtmlCreator } from "./htmlCreator";
import PCreator from "./pCreator";

export default class BlockquoteCreator implements HtmlCreator{
    generate(element: Blockquote): string {
        const pCreator = new PCreator();
        return `<blockquote>${pCreator.generate(element)}</blockquote>`;
    }
}