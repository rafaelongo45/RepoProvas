import { Users } from "@prisma/client";
import bcrypt from "bcrypt";

async function isPasswordCorrect(password: string, user: Users){
  const isCorrect = await bcrypt.compare(password, user.password);
  return isCorrect;
};

export default isPasswordCorrect;