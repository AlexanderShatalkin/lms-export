import { createCanvas, CanvasRenderingContext2D } from "canvas"
import * as fs from "fs";

interface Path{
    x: number,
    y: number,
    width: number,
    height: number,
    size: string,
    fill: string,
    points: number[][],
}

interface Point{
    x:number,
    y:number,
}

export async function getImg(data:any[]){
    const size = getImageDimensions(data);
    
    const canvas = createCanvas(size.width, size.height);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle ="white";
    ctx.fillRect(0, 0, size.width, size.height);

    data.forEach(path => {
        addPathToCanvas(path, ctx);
    });

    // const out = fs.createWriteStream('output.png');
    // const stream = canvas.createPNGStream();
    // stream.pipe(out);

    return canvas.toBuffer('image/png');

}

function addPathToCanvas(path:Path, ctx:CanvasRenderingContext2D){
    const points: Point[] = convertPathToPoints(path);
    ctx.fillStyle = "black"; //TODO: change it to fill in the path
    ctx.lineWidth = 2; //TODO: write a function that will get this parameter from size of path
    ctx.beginPath();
    ctx.moveTo(path.x, path.y);
    points.forEach((point: Point) =>{
        ctx.lineTo(point.x, point.y);
    })
    ctx.stroke();
}

function convertPathToPoints(path:Path): Point[]{
    const x:number = path.x;
    const y:number = path.y;

    const points:Point[] = [];

    path.points.forEach(element => {
        points.push({x: element[0] + x, y:element[1] + y});
    });
    return points;
}

function getImageDimensions(data: Path[]): {width: number, height: number}{
    let maxX = 0;
    let maxY = 0;
    
    data.forEach(({x, y, width, height}) => {
        maxX = Math.max(maxX, x+width);
        maxY = Math.max(maxY, y+height);
    })

    return {width: maxX, height: maxY}
}
