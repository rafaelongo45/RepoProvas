import { Request, Response } from "express";

import termsService from "../services/termsService.js";

export async function getTerms(req:Request, res: Response){
  const terms = await termsService.getTermsWithDisciplines();
  return res.status(200).send(terms);
}