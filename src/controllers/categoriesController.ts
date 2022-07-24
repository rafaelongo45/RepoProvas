import { Request, Response } from "express";

import categoriesService from "../services/categoriesService.js";


export async function getAllCategories(req: Request, res: Response){
  const categories = await categoriesService.findAllCategories();
  return res.status(200).send(categories);
};