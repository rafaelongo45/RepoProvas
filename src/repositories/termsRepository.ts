import prisma from "../config/database.js";

async function findAll(){
  const terms = await prisma.terms.findMany({
    select:{
      id:true,
      number: true,
      discipline:{
        select:{
          id: true,
          name: true
        }
      }
    }
  })

  return terms;
};

const termsRepository = {
  findAll
};

export default termsRepository;