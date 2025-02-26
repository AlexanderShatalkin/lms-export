import PageGenerator from "./PageGenerator";
import { mainPageTemplate } from "../scormPagesPatterns/mainPage";
import Handlebars from "handlebars";
import path from "path";
import fs from "fs";

export default class MainPageGenerator extends PageGenerator{
    private title: string;
    private works: any[];
    
    constructor(path: string, title: string, works: any[]){
        super(path);
        this.title = title;
        this.works = works;
    }

    public generate(): string{
        const data = {
            title: this.title,
            works: this.works
        }
        return Handlebars.compile(mainPageTemplate)(data);

    }
}