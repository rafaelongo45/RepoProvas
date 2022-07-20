import prisma from "../config/database.js"

async function insert(email: string, password: string){
  await prisma.users.create({
    data:{
      email,
      password
    }
  });
};

async function findByEmail(email: string){
  const user = await prisma.users.findFirst({
    where: {
      email
    }
  });

  return user;
};

const authRepository = {
  insert,
  findByEmail
};

export default authRepository;