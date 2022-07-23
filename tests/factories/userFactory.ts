import { faker } from '@faker-js/faker';
import bcrypt from "bcrypt";
import prisma from "../../src/config/database";

async function createUser(){
  const SALT = 10;
  const password = faker.internet.password();
  const user = {
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  };

  const insertedUser = await prisma.users.create({
    data:{
      email: user.email,
      password: bcrypt.hashSync(user.password, SALT)    
    }
  });

  return insertedUser;
}

async function createSession(){
  const user = await createUser();
  const token = 'token_totalmente_aleatorio'
  const session = await prisma.sessions.create({
    data:{
      userId: user.id,
      token
    }
  });
  return session;
}

const userFactory = {
  createUser,
  createSession
};

export default userFactory;