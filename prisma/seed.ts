import prisma from "../src/config/database.js";

async function main(){
  //create terms
  const termsData = [
    { number: 1 },
    { number: 1 },
    { number: 1 },
    { number: 1 },
    { number: 1 },
    { number: 1 }
  ];

  termsData.forEach(async (term) => {
    await prisma.terms.upsert({
      where: { number: term.number },
      update: {},
      create: { number: term.number }
    })
  })
  
  //create categories
  const categoriesData = [
    { name: 'Projeto'},
    { name: 'Prática'},
    { name: 'Recuperação'},
  ]
  categoriesData.forEach(async (category) => {
    await prisma.categories.upsert({
      where: { name: category.name },
      update: {},
      create: { name: category.name }
    })
  })

  //create teachers
  const teachersData = [
    { name: 'Diego Pinho'},
    { name: 'Bruna Hamori'}
  ]
  teachersData.forEach(async (teacher) => {
    await prisma.teachers.upsert({
      where: { name: teacher.name },
      update: {},
      create: { name: teacher.name }
    })
  })

  //create disciplines
  const disciplinesData = [
    {name: 'HTML e CSS', termId: 1},
    {name: 'JavaScript', termId: 2},
    {name: 'React', termId: 3},
    {name: 'Humildade', termId: 1},
    {name: 'Planejamento', termId: 2},
    {name: 'Autoconfiança', termId: 3}
  ]
  disciplinesData.forEach(async (discipline) => {
    await prisma.disciplines.upsert({
      where: { name: discipline.name },
      update: {},
      create: { name: discipline.name, termId: discipline.termId }
    })
  })
  
  //create teachersDisciplines
  const teachersDisciplinesData = [
    { teacherId: 1, disciplineId: 1},
    { teacherId: 1, disciplineId: 2},
    { teacherId: 1, disciplineId: 3},
    { teacherId: 2, disciplineId: 4},
    { teacherId: 2, disciplineId: 5},
    { teacherId: 2, disciplineId: 6},
  ]
  teachersDisciplinesData.forEach(async (teacherDiscipline) => {
    await prisma.teachersDisciplines.upsert({
      where: { teacherId_disciplineId: {
        teacherId: teacherDiscipline.teacherId,
        disciplineId: teacherDiscipline.disciplineId
      } },
      update: {},
      create: { teacherId: teacherDiscipline.teacherId, disciplineId: teacherDiscipline.teacherId }
    })
  })
}

main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})

