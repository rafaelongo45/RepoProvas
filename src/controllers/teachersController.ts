import { Request, Response } from "express";

import teacherDiscService from "../services/teachersService.js";

export async function getAllTeacherDisc(req: Request, res: Response){
  const teacherDisc = await teacherDiscService.findAllTeacherDiscipline();
  return res.status(200).send(teacherDisc);
};