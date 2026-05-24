import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";


export const handleInpuErrors = (req: Request, res: Response, next: NextFunction) => {
  // console.log('Desde Middleware');
  // * Leer los mensajes de error
  let errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  
  next()
}