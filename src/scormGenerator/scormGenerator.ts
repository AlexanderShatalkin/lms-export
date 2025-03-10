import path from "path";
import fs from "fs/promises";
import MainPageGenerator from "./mainPageGenerator";
import WorkPageGenerator from "./workPageGenerator";

enum Style{
    None,
    Default,
}

export default class ScormGenerator{
    private path: string;
    private course: any;
    private works: any[];
    private style = Style.Default;
    private sections: {workType: string, works: any[]}[];


    constructor(path: string, sections: any){
        this.path = path;
        this.works = [];
        this.sections = sections;
    }

    public setStyle(style: Style){ 
        this.style = style;
    }

    public async generate():Promise<string>{

        await this.generateStyles();

        console.log(this.sections);
        await Promise.all(this.sections.map(async (section) => {
            await Promise.all(section.works.map(async (work: any) => {
                await this.generateWorkPage(work);
            }))
        }));

        this.generateMainPage()

        var scopackager = require('simple-scorm-packager');
        scopackager({
          version: '1.2', 
          organization: 'LmsDot',
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
        return "./scorm_course.zip";
    }

    private async generateStyles():Promise<void>{
        if (this.style === Style.Default){
            const sourcePath = path.join(process.cwd(), "./src/static/default.css");
            const destinationDir = path.join(process.cwd(), "scormData");
            const destinationPath = path.join(destinationDir, "style.css");
    
            await fs.copyFile(sourcePath, destinationPath);
        }
    }

   private async  generateMainPage():Promise<void>{
        const mainPageGenerator = new MainPageGenerator("Main page", this.sections);
        const html = mainPageGenerator.generate();
        const filePath = path.join(this.path, "index.html");
        console.log(filePath);
        await fs.writeFile(filePath, html);
    }

    private async generateWorkPage(work: any,):Promise<void> {
        const generator = new WorkPageGenerator(work.id, work.name, work.tasks);
        const html = await generator.generate();
        const filePath = path.join(this.path, `${work.id}.html`);
        this.works.push({
            title: work.name,
            url: `${work.id}.html`,
        });
        await fs.writeFile(filePath, html)

    }
}