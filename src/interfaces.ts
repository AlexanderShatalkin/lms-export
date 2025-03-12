
import { PrismaClient, TaskTemplate, User, Task, Prisma, Score } from '../prisma/client'


export type Answer = {
  user: User;
  task: Task;
  answer: Prisma.JsonValue | null,
  score: Score;
};

export type WorkWithVariants = Prisma.WorkGetPayload<{select: {
  id: true,
  name: true,
  description: true,
  course: true,
  workVariants: {
    select: {
      id: true,
      name: true,
      tasks: true,
      base: true,
    },
  },
  studyWork: {
    select: {
      workType: true,
    },
  },
}}>;

export interface ParagraphChild{
  text: string,
  bold?: boolean,
  italic?: boolean,
  underline?: boolean,
  strikethrough?: boolean,
  superscript?: boolean,
  subscript?: boolean,
  color?: string,
  backgroundColor?: string,
}

export interface Paragraph{
  type: "p" | "blockquote",
  children:ParagraphChild[],
  listStyleType?: "disc" | "decimal" | null,
}

export interface Blockquote{
  type: "blockquote",
  children:ParagraphChild[],
}

export interface Header{
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
  children: ParagraphChild[],
}

export interface Hr{
  type: "hr",
  children: ParagraphChild[],
}

export interface Image{
  type: "img",
  url: string,
  children: ParagraphChild[],
}

export interface Equation{
  type: "equation",
  children: ParagraphChild[],
  texExpression: string,
}

export interface Td{
  type: "td",
  children: Paragraph[],
}

export interface Tr{
  type: "tr",
  children: Td[],
}

export interface Table{
  type: "table",
  children: Tr[],
}

export interface Data{
  type: string,
  x: number,
  y: number,
  width: number,
  height: number,
  size: string,
  fill: string,
  points: [number, number, number][]
}

export interface Paint{
  type: "paint",
  children: ParagraphChild[],
  data: Data[]
}

export type TaskContentElement = Paragraph | Blockquote | Header | Table | Hr | Image | Equation | Paint
export interface TaskContent{
  content: TaskContentElement[],
}
