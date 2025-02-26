import Handlebars from "handlebars";
import PageGenerator from "./PageGenerator";
import { workPageTemplate } from "../scormPagesPatterns/workPage";

export default class WorkPageGenerator implements PageGenerator{
    private title: string;
    private tasks: any[];
    
    constructor(title: string, tasks: any[]){
        this.title = title;
        this.tasks = tasks;
    }

    public generate(): string{
        console.log(this.title)
        const data = {
            title: this.title,
            tasks: this.tasks
        }
        const workHtml =  Handlebars.compile(workPageTemplate)(data);
        return workHtml;

    }
}