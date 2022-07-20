import { NextFunction, Request, Response } from "express";

import authRepository from "../repositories/authRepository.js";

export async function validateToken(req: Request, res: Response, next: NextFunction){
  const { authorization } = req.headers;
  const token = authorization?.replace('Bearer', '').trim();

  if(!token){
    throw { type: "authError", message: "Token not sent", code: 403 }
  }  
  
  const session = await validateSession(token);
  res.locals.userId = session.userId;
  res.locals.token = session.token;
  next();
};

async function validateSession(token: string){
  const session = await authRepository.findSession(token);

  if(!session){
    throw { type: "notFound", message: "There isn't a session created with this token", code: 404 }
  }

  if(!session.isValid){
    throw { type: "expiredError", message: "Token is not valid anymore. Create a new session!", code: 403}
  }

  return session;
};
