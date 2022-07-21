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

export async function getAllTests(req: Request, res: Response){
  const tests = await testsService.findTests();
  return res.status(200).send(tests);
}