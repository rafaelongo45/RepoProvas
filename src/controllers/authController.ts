import { Users } from "@prisma/client";
import { Request, Response } from "express";

import authService from "../services/authService.js";

export async function createUser(req: Request, res: Response){
  const body : Users = req.body;
  await authService.insertUser(body);
  return res.sendStatus(201);
};