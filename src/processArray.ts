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
      base: true,
    },
  },
  studyWork: {
    select: {
      workType: true,
    },
  },
}}>;

export function GroupWorksByWorkType(works:WorkWithVariants[]):{workType: string, works: WorkWithVariants[]}[]{

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
