import joi from "joi";

export const testSchema = joi.object({
  name: joi.string().required(),
  pdfLink: joi.string().uri().required(),
  category: joi.string().valid('Projeto', 'Prática', 'Recuperação').required(),
  discipline: joi.string().required(),
  professor: joi.string().required()
});