export interface ContentElement{
    type: String
    children: any[]
}

export interface TaskContent{
    content: ContentElement[],
    version: number,
}

export interface Task{
    task: string;
    content: TaskContent; 
}

export interface Work{
    work:string;
    tasks:Task[]
}
