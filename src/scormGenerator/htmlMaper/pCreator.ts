import { Paragraph, ParagraphChild } from "../../interfaces";
import { HtmlCreator } from "./htmlCreator";

export default class PCreator implements HtmlCreator{
    static listOrder: number = 0;
    
    generate(element: Paragraph): string {
        let html = ""
        element.children.forEach(child => {
            html += this.generateTagWithStyles(child);
        });
        return `<div>${html}</div>`
    }

    private generateTagWithStyles(element: ParagraphChild): string{
        const styles: string[] = [];
        if (element.bold) styles.push("font-weight: bold");
        if (element.italic) styles.push("font-style:italic");
        if (element.underline) styles.push("text-decoration: underline");
        if (element.strikethrough) styles.push("text-decoration: line-through");
        if (element.superscript) styles.push("vertical-align: super; font-size: smaller");
        if (element.subscript) styles.push("vertical-align: sub; font-size: smaller");
        if (element.color) styles.push(`color: ${element.color}`);
        if (element.backgroundColor) styles.push(`background-color: ${element.backgroundColor}`);

        const text = element.text.replace("\n", "<br>");
        const style = styles.length > 0 ? ` style="${styles.join("; ")}"` : "";
        return `<span ${style}>${text}</span>`
    }
}