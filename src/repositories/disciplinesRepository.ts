import prisma from "../config/database.js";

async function findByName(name: string){
  const discipline = await prisma.disciplines.findFirst({
    where:{
      name
    }
  });

  return discipline;
};

const disciplinesRepository = {
  findByName
};

export default disciplinesRepository;