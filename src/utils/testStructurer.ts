export function structureTests(tests){ //TODO: Tipar essa brincadeira aqui
  const structuredTests = tests.map(test => {
    return {
      id: test.teacherDiscipline.discipline.term.id,
      number:test.teacherDiscipline.discipline.term.number,
      disciplines:[{
        id: test.teacherDiscipline.discipline.id,
        name: test.teacherDiscipline.discipline.name,
        teacherDisciplines: [{
          tests: [{
            id: test.id,
            pdfUrl: test.pdfUrl,
            name: test.name,
            category:[{
              id: test.category.id,
              name: test.category.name
            }]
          }],
          teacher: [{
            name: test.teacherDiscipline.teacher.name,
          }]
        }]
      }]
    }
  });

  return structuredTests;
};