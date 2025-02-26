export default abstract class PageGenerator{
    protected path: string

    constructor(path: string){
        this.path = path;
    }

    public abstract generate(): string;
}