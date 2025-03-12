import { Prisma, StudyWork, Work, WorkVariant } from "../prisma/client";

type WorkWithVariants = Prisma.WorkGetPayload<{select: {
  id: true,
  name: true,
  description: true,
  course: true,
  workVariants: {
    select: {
      id: true,
      name: true,
      tasks: true,
    },
  },
  studyWork: {
    select: {
      workType: true,
    },
  },
}}>;

export function GroupWorksByWorkType(works:WorkWithVariants[]):{workType: string, works: WorkWithVariants[]}[]{
  // const workVariantsArrayFlatMap = works.flatMap((work:any) => 
  //   work.workVariants.map((workVariant:any) => ({
  //     name: `${work.name} ${workVariant.name}`,
  //     tasks: workVariant.tasks,
  //     workType: work.studyWork?.workType?.name || "",
  //     description: work.description,
  //     id: workVariant.id,
  //   }))
  // );

  // const finishArray = Object.entries(works.reduce((acc: any, work:any) => {
  //   const workType = work.workType || "";
  //   if (!acc[workType]) {
  //     acc[workType] = [];
  //   }
  //   acc[workType].push({
  //     name: work.name,
  //     description: work.description,
  //     tasks: work.tasks,
  //     id: work.id,
  //   });
  //   return acc;
  // }, {})).map(([workType, works]) => ({ workType, works }));

  const grouped =  works.reduce<Record<string, { workType: string; works: WorkWithVariants[] }>>((acc, work) => {
    const workType = work.studyWork?.workType?.name || ""; 

    if (!acc[workType]) {
      acc[workType] = { workType, works: [] };
    }

    acc[workType].works.push(work);
    return acc;
  }, {});

  return Object.values(grouped);

}
