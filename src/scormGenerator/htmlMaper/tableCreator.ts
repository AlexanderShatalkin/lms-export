import { HtmlCreator } from "./htmlCreator";
import PCreator from "./pCreator";

export default class TableCreator implements HtmlCreator{
    generate(element: any): string {
        let html = "";
        element.children.forEach((child:any) => {
            html += this.generateRow(child);
        });
        return `<table style="border: 1px solid;">${html}</table>`;
    }

    private generateRow(element: any): string{
        let html = "";
        element.children.forEach((child:any) => {
            html += this.generateCell(child);
        });
        return `<tr style="border: 1px solid;">${html}</tr>`;
    }

    private generateCell(element: any): string{
        let html = "";
        element.children.forEach((child:any) => {
            const pCreator = new PCreator();
            html += pCreator.generate(child);
        })
        return `<td style="border: 1px solid;">${html}</td>`;
    }
}