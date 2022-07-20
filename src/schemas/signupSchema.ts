import joi from "joi";
import { Users } from "@prisma/client";

interface Signup extends Users{
  confirmPassword: string;
}

const signupSchema = joi.object<Signup>({
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.string().valid(joi.ref('password')).required()
});

export default signupSchema;