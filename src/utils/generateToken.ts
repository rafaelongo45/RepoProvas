import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Users } from "@prisma/client";

dotenv.config();

async function generateJWTToken(user: Users){
  const token = jwt.sign(user, process.env.JWT_KEY);
  return token;
}

export default generateJWTToken;