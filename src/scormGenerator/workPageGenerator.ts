import Handlebars from "handlebars";
import PageGenerator from "./PageGenerator";
import { workPageTemplate } from "../scormPagesPatterns/workPage";
import { workVariantTemplate } from "../scormPagesPatterns/workVariantPage";
import { HtmlCreator } from "./htmlMaper/htmlCreator";
import PCreator from "./htmlMaper/pCreator";
import ImgCreator from "./htmlMaper/imgCreator";
import MathCreator from "./htmlMaper/mathCreator";
import TableCreator from "./htmlMaper/tableCreator";
import PaintCreator from "./htmlMaper/paintCreator";
import HeaderCreator from "./htmlMaper/headerCreator";
import BlockquoteCreator from "./htmlMaper/blockquoteCreator";
import HrCreator from "./htmlMaper/hrCreator";
import ListManager from "./htmlMaper/listManager";
import { TaskContentElement, WorkWithVariants } from "../interfaces";
import { JsonValue } from "@prisma/client/runtime/library";
import { Task } from "../../prisma/client";
import { TaskContent } from "../interfaces";

interface WorkVariant{
    tasks: Task[],
    name: string,
    base: boolean,
}

export default class WorkPageGenerator implements PageGenerator{
    private title: string;
    private worksVariants: WorkVariant[];
    private id: string;
    private mapping: {[key: string]: HtmlCreator} = {};
    
    constructor(work:WorkWithVariants){
        this.title = work.name;
        this.worksVariants = work.workVariants;
        this.id = work.id;

        this.mapping["p"] = new PCreator();
        this.mapping["img"] = new ImgCreator();
        this.mapping["equation"] = new MathCreator();
        this.mapping["table"] = new TableCreator();
        this.mapping["paint"] = new PaintCreator();
        this.mapping["h1"] = this.mapping["h2"] = this.mapping["h3"] = this.mapping["h4"] = this.mapping["h5"] = this.mapping["h6"] = new HeaderCreator();
        this.mapping["blockquote"] = new BlockquoteCreator();
        this.mapping["hr"] = new HrCreator();
    }

    
    public async generate(): Promise<string>{
        const workVariants = await Promise.all(
            this.worksVariants.map(async (workVariant: WorkVariant) => {
                return this.generateWorkVariant(workVariant);
            })
        );
        const html = workVariants.join("");
        const data = {
            title: this.title,
            workVariantsHtml: html,
        }
        return Handlebars.compile(workPageTemplate)(data);
    }

    private async generateWorkVariant(work:WorkVariant): Promise<string>{
        const tasks = await Promise.all(
            work.tasks.map(async (task: Task) => {
                const content = (task.content as unknown as TaskContent).content;
                const listManager = new ListManager();
                const htmlParts = await Promise.all(
                    content.map(async (element: TaskContentElement) => {
                        const wrapTemplate = listManager.getHtmlTemplate(element);
                        const html = await this.mapping[element.type].generate(element);
                        return wrapTemplate.split("{{{html}}}").join(html)
                    })
                );
        
                const html = htmlParts.join("");
                return `<div><h1 class="task-header">${task.name}</h1>${html}</div>`;
            })
        );
        const title = work.base ? "Базовый" : work.name;
        const data = {
            title: title,
            tasks: tasks
        }
        const workHtml =  Handlebars.compile(workVariantTemplate)(data);
        return workHtml;
    }
}