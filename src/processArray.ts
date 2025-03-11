export function PrepareArrayToScormGeneration(works:any):any[]{
  const workVariantsArrayFlatMap = works.flatMap((work:any) => 
    work.workVariants.map((workVariant:any) => ({
      name: `${work.name} ${workVariant.name}`,
      tasks: workVariant.tasks,
      workType: work.studyWork?.workType?.name || "Unknown",
      description: work.description,
      id: workVariant.id,
    }))
  );

  const finishArray = Object.entries(workVariantsArrayFlatMap.reduce((acc: any, work:any) => {
    const workType = work.workType || "Unknown";
    if (!acc[workType]) {
      acc[workType] = [];
    }
    acc[workType].push({
      name: work.name,
      description: work.description,
      tasks: work.tasks,
      id: work.id,
    });
    return acc;
  }, {})).map(([workType, works]) => ({ workType, works }));

  return finishArray;
}