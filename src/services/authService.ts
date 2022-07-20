import { Users } from "@prisma/client";

import authRepository from "../repositories/authRepository.js";
import encryptPassword from "../utils/encryptSignupPassword.js";

async function userExists(email: string){
  const user = await authRepository.findByEmail(email);

  if(user){
    throw { type: "authError", message: "E-mail already registered", code: 409}
  }  
};

async function insertUser(body: Users){
  await userExists(body.email);
  const encPassword = encryptPassword(body.password);
  await authRepository.insert(body.email, encPassword);
};

const authService = {
  insertUser
};

export default authService;