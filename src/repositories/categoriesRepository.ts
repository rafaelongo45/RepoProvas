import prisma from "../config/database.js";

async function findByName(name: string){
  const category = await prisma.categories.findFirst({
    where:{
      name
    }
  });

  return category;
};

async function findAll(){
  const categories = await prisma.categories.findMany({
    select:{
      id: true,
      name: true
    }
  });
  return categories
}

const categoriesRepository = {
  findByName,
  findAll
};

export default categoriesRepository;