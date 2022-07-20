import { Users } from "@prisma/client";

import isPasswordCorrect from "../utils/checkPassword.js";
import authRepository from "../repositories/authRepository.js";
import encryptPassword from "../utils/encryptSignupPassword.js";
import generateJWTToken from "../utils/generateToken.js";

async function verifyUser(email: string, password: string){
  const user = await authRepository.findByEmail(email);

  if(!user){
    throw { type: "authError", message: "E-mail not registered", code: 404 };
  }

  const isSame = await isPasswordCorrect(password, user);

  if(!isSame){
    throw { type: "authError", message: "Incorrect password", code: 403};
  }

  return user;
}

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

async function loginUser(body: Users){
  const user = await verifyUser(body.email, body.password);
  const token = await generateJWTToken(body);
  await authRepository.insertSession(token, user.id);
  return { token };
}

async function logoutUser(token: string){
  await authRepository.invalidateSession(token);
}

const authService = {
  insertUser,
  loginUser,
  logoutUser
};

export default authService;