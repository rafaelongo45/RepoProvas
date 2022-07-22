import joi from "joi";
import { Users } from "@prisma/client";

interface Signup extends Users{
  passwordConfirmation: string;
}

const signupSchema = joi.object<Signup>({
  email: joi.string().email().required(),
  password: joi.string().required(),
  passwordConfirmation: joi.string().valid(joi.ref('password')).required()
});

export default signupSchema;