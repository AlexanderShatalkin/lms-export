import path from "path";
import fs from "fs";
import MainPageGenerator from "./mainPageGenerator";

export default class ScormGenerator{
    private path: string;
    
    constructor(path: string, course: any){
        this.path = path;
    }

    public generate(){
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

    private generateMainPage():void{

        
        const mainPageGenerator = new MainPageGenerator(this.path, "Main page", []);
        const html = mainPageGenerator.generate();
        const filePath = path.join(this.path, "index.html");
        console.log(filePath);
        fs.writeFile(filePath, html, (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
}