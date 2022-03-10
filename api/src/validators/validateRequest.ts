import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

yup.setLocale({
  mixed: {
    default: 'Não é válido',
    required: 'Obrigatório'
  },
  string: {
    min: 'Deve ser maior que ${min}',
    max: 'Deve ser menor que ${max}'
  },
});

export const validateRequest = (schema: yup.AnyObjectSchema): yup.Asserts<yup.AnyObjectSchema> => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const validateBody = await schema.validate(body);

      req.body = validateBody;

      next();
    } catch (err: any) {
      const errors: [] = err.errors;
      next(`Campo ${err.path}: ${errors.join(',')}`);
    } 
  }
}