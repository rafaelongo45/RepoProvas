import prisma from "../config/database.js";

async function findByName(name: string){
  const professor = await prisma.teachers.findFirst({
    where:{
      name
    }
  });

  return professor;
};

async function findAll(){
  const teacherWithDisc = await prisma.teachers.findMany({
    select:{
      id: true,
      name: true,
      teacherDiscipline: {
        select:{
          discipline:{
            select:{
              id:true,
              name:true,
            }
          }
        }
      }
    }
  });

  return teacherWithDisc;
}

const teachersRepository = {
  findByName,
  findAll
};

export default teachersRepository;