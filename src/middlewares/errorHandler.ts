import { NextFunction, Request, Response } from "express";

export default async function handleError(error, req: Request, res: Response, next: NextFunction){
  if(error.type){
    return res.status(error.code).send(error.message);
  }
  console.log(error)
  return res.sendStatus(500);
}