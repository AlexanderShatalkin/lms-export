export interface HtmlCreator{
    generate(element: any): string | Promise<string>;
}