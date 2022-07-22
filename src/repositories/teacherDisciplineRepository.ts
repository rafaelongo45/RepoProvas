import prisma from "../config/database.js";

async function findIdByDisciplineNameAndTeacherName(discipline: string, teacher: string){
  const disciplineTeacher = await prisma.teachersDisciplines.findFirst({
    where:{
      discipline: {
        is:{
          name: discipline
        }
      },
      teacher:{
        is:{
          name: teacher
        }
      }
    }
  });

  return disciplineTeacher;
};

async function findById(id: number){
  const discTeacher = await prisma.teachersDisciplines.findFirst({
    where:{
      id
    }
  });

  return discTeacher;
};

const teacherDisciplineRepository = {
  findIdByDisciplineNameAndTeacherName,
  findById
};

export default teacherDisciplineRepository;