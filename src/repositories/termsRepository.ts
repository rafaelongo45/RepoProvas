import prisma from "../config/database.js";

async function findAll(){
  const terms = await prisma.terms.findMany({
    orderBy: [
      {
        number: 'asc'
      }
    ],
    select:{
      id:true,
      number: true,
      discipline:{
        orderBy: [
          {
            name: 'asc'
          }
        ],
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