import prisma from "../config/database.js";

async function findByName(name: string){
  const professor = await prisma.teachers.findFirst({
    where:{
      name
    }
  });

  return professor;
};

const teachersRepository = {
  findByName
};

export default teachersRepository;