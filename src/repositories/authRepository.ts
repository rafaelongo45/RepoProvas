import { Sessions } from "@prisma/client";
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

async function insertSession(token: string, userId: number){
  await prisma.sessions.create({
    data: {
      userId,
      token
    }
  });
};

async function findSession(token: string){
  const session = await prisma.sessions.findFirst({
    where: {
      token
    }
  });

  return session;
};

const authRepository = {
  insert,
  findByEmail,
  insertSession,
  findSession,
};

export default authRepository;