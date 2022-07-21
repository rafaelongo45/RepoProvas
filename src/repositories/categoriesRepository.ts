import prisma from "../config/database.js";

async function findByName(name: string){
  const category = await prisma.categories.findFirst({
    where:{
      name
    }
  });

  return category;
};

const categoriesRepository = {
  findByName
};

export default categoriesRepository;