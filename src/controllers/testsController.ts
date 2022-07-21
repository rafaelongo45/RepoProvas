import { Request, Response } from "express";

import testsService from "../services/testsService.js";

export interface TestBody {
  name: string
  pdfLink: string
  category: string
  discipline: string
  professor: string
};

export async function createTest(req: Request, res: Response){
  const body: TestBody = req.body;
  await testsService.insertTest(body);
  return res.sendStatus(201);
};