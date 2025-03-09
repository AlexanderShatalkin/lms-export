
enum Tag{
    None,
    Ul,
    Ol,
}

enum ListState{
    Begin, // first item of list
    End, // first item outside of list
    In, // item inside list
    Out, // item outside of list
    BeginEnd, // first item outside of old list and first item of new list
}


export default class ListManager{
    private currentTag:Tag;
    
    public constructor(currentTag: Tag = Tag.None){
        this.currentTag = currentTag;
    }


    public getHtmlTemplate(element: any):string{
        const elementTag = this.getTagFromListType(element.listStyleType);
        const listState = this.getListState(elementTag);
        const template = this.getHtmlTemplateByState(elementTag, listState);
        this.currentTag = elementTag;
        return template;
    }

    private getHtmlTemplateByState(elementTag:Tag, listState: ListState):string{
        const newListTag = this.getListTag(elementTag);
        const oldListTag = this.getListTag(this.currentTag);
        switch(listState){
            case ListState.Begin:
                return  `<${newListTag}><li>{{{html}}}</li>`;
            case ListState.End:
                return `</${oldListTag}>{{{html}}}`;
            case ListState.In:
                return `<li>{{{html}}}</li>`;
            case ListState.Out:
                return `{{{html}}}`;
            case ListState.BeginEnd:
                return `</${oldListTag}><${newListTag}><li>{{{html}}}</li>`;
        }
    }

    private getListState(elementTag: Tag):ListState{
        if (elementTag === this.currentTag && elementTag !== Tag.None) return ListState.In;
        if (elementTag === Tag.None && this.currentTag === Tag.None) return ListState.Out;
        if (this.currentTag === Tag.None && elementTag !== Tag.None) return ListState.Begin;
        if (this.currentTag !== Tag.None && elementTag !== Tag.None && this.currentTag !== elementTag) return ListState.BeginEnd;
        if (this.currentTag !== Tag.None && elementTag === Tag.None) return ListState.End;
        throw new Error("Unknown list state");
    }

    private getTagFromListType(listType:string): Tag{
        if (listType === "disc") return Tag.Ul;
        if (listType === "decimal") return Tag.Ol;
        return Tag.None;
    }

    private getListTag(tag: Tag):string{
        switch(tag){
            case Tag.Ul:
                return "ul"
            case Tag.Ol:
                return "ol"
            case Tag.None:
                return "";
        }
    }

    
}