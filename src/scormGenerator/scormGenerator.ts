import path from "path";
import fs from "fs/promises";
import MainPageGenerator from "./mainPageGenerator";
import WorkPageGenerator from "./workPageGenerator";

export default class ScormGenerator{
    private path: string;
    private course: any;
    private works: any[];


    constructor(path: string, course: any){
        this.path = path;
        this.course = course;
        this.works = [];
    }

    public async generate(){

        
        this.course.works.forEach((work: any) => {
            this.generateWorkPage(work);
        });
        console.log(this.works)
        
        this.generateMainPage()

        var scopackager = require('simple-scorm-packager');
        scopackager({
          version: '1.2', 
          organization: 'My Organization',
          title: 'test',
          language: 'en',
          identifier: 'example_scorm_course',
          masteryScore: 80,
          startingPage: 'index.html', 
          source: this.path, // Папка с контентом
          package: {
            zip: true,
            outputFolder: "./scormPackage", // Папка для сохранения SCORM пакета
            zipFilename: 'scorm_course.zip'
          }
        }, function() {
          console.log('SCORM пакет успешно создан!');
        });
    }

   private async  generateMainPage():Promise<void>{


        const mainPageGenerator = new MainPageGenerator("Main page", this.works);
        const html = mainPageGenerator.generate();
        const filePath = path.join(this.path, "index.html");
        console.log(filePath);
        await fs.writeFile(filePath, html);
    }

    private async generateWorkPage(work: any):Promise<void> {
        const generator = new WorkPageGenerator(work.name, work.tasks);
        const html = generator.generate();
        const filePath = path.join(this.path, `${work.id}.html`);
        console.log(work.name);
        this.works.push({
            title: work.name,
            url: `${work.id}.html`,
        });
        await fs.writeFile(filePath, html)

    }
}