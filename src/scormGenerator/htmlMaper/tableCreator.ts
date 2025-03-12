import { Table, Td, Tr } from "../../interfaces";
import { HtmlCreator } from "./htmlCreator";
import PCreator from "./pCreator";

export default class TableCreator implements HtmlCreator{
    generate(element: Table): string {
        let html = "";
        element.children.forEach(child => {
            html += this.generateRow(child);
        });
        return `<table style="border: 1px solid;">${html}</table>`;
    }

    private generateRow(element: Tr): string{
        let html = "";
        element.children.forEach(child => {
            html += this.generateCell(child);
        });
        return `<tr style="border: 1px solid;">${html}</tr>`;
    }

    private generateCell(element: Td): string{
        let html = "";
        element.children.forEach(child => {
            const pCreator = new PCreator();
            html += pCreator.generate(child);
        })
        return `<td style="border: 1px solid;">${html}</td>`;
    }
}