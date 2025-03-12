import { TaskContentElement } from "../../interfaces";

export interface HtmlCreator{
    generate(element: TaskContentElement): string | Promise<string>;
}