import Handlebars from "handlebars";
import PageGenerator from "./PageGenerator";
import { workPageTemplate } from "../scormPagesPatterns/workPage";
import { HtmlCreator } from "./htmlMaper/htmlCreator";
import PCreator from "./htmlMaper/pCreator";
import ImgCreator from "./htmlMaper/imgCreator";
import MathCreator from "./htmlMaper/mathCreator";
import TableCreator from "./htmlMaper/tableCreator";
import PaintCreator from "./htmlMaper/paintCreator";
import HeaderCreator from "./htmlMaper/headerCreator";
import BlockquoteCreator from "./htmlMaper/blockquoteCreator";
import HrCreator from "./htmlMaper/hrCreator";
export default class WorkPageGenerator implements PageGenerator{
    private title: string;
    private tasks: any[];
    private id: string;
    private mapping: {[key: string]: HtmlCreator} = {};
    
    constructor(id: string, title: string, tasks: any[]){
        this.title = title;
        this.tasks = tasks;
        this.id = id;

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
        // const tasks = this.tasks.map((task:any) => {
        //     const content = (task.content as Record<string, any>).content;
        //     const html = content.map((element:any) => {
        //         return this.mapping[element.type].generate(element);
        //     }).join("");

            
        //     return `<div><h1>${task.name} </h1>${html}</div>`
        // });


        const tasks = await Promise.all(
            this.tasks.map(async (task: any) => {
                const content = (task.content as Record<string, any>).content;
        
                const htmlParts = await Promise.all(
                    content.map(async (element: any) => {
                        return await this.mapping[element.type].generate(element);
                    })
                );
        
                const html = htmlParts.join("");
        
                return `<div><h1>${task.name}</h1>${html}</div>`;
            })
        );

        console.log({id: this.id, tasks: tasks});
        const data = {
            title: this.title,
            tasks: tasks
        }
        const workHtml =  Handlebars.compile(workPageTemplate)(data);
        return workHtml;

    }
}