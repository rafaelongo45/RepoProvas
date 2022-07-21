import { Tests } from "@prisma/client";

export function structureTests(tests){ //TODO: Tipar essa brincadeira aqui
  const structuredTests = tests.map(test => {
    return {
      id: test.id,
      name: test.name,
      pdfUrl: test.pdfUrl,
      categoryName: test.category.name,
      teacherName: test.teacherDiscipline.teacher.name,
      disciplineName: test.teacherDiscipline.discipline.name,
      disciplineTerm: test.teacherDiscipline.discipline.term.number
    }
  });

  return structuredTests;
}