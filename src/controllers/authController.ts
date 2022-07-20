import { Users } from "@prisma/client";
import { Request, Response } from "express";

import authService from "../services/authService.js";

export async function createUser(req: Request, res: Response){
  const body : Users = req.body;
  await authService.insertUser(body);
  return res.sendStatus(201);
};

export async function login(req: Request, res: Response){
  const body : Users = req.body;
  const token = await authService.loginUser(body)
  return res.status(200).send(token);
};

export async function logout(req: Request, res: Response){
  const { token } = res.locals;
  await authService.logoutUser(token);
  return res.sendStatus(200);
}