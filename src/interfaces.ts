
import { PrismaClient, TaskTemplate, User, Task, Prisma, Score } from '../prisma/client'
// export interface ContentElement{
//     type: String
//     children: any[]
// }

// export interface TaskContent{
//     content: ContentElement[],
//     version: number,
// }

// export interface Task{
//     task: string;
//     content: TaskContent; 
// }

// export interface Work{
//     work:string;
//     tasks:Task[]
// }

export type Answer = {
  user: User;
  task: Task;
  answer: Prisma.JsonValue | null,
  score: Score;
};