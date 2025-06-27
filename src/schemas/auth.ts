import joi from 'joi'

export const loginSchema = joi.object({
  email: joi.string().email().required().messages({
    'any.required': 'Campo de e-mail não pode ser vazio',
    'string.empty': 'Campo de e-mail não pode ser vazio',
    'string.base': 'E-mail precisa ser do tipo string',
    'string.email': 'E-mail inválido',
  }),
  password: joi.string().required().messages({
    'any.required': 'Campo de senha não pode ser vazio',
    'string.empty': 'Campo de senha não pode ser vazio',
    'string.base': 'Senha precisa ser do tipo string',
  }),
})

export const registerSchema = joi.object({
  name: joi.string().min(3).required().messages({
    'any.required': 'Campo de nome não pode ser vazio',
    'string.empty': 'Campo de nome não pode ser vazio',
    'string.base': 'Nome precisa ser do tipo string',
    'string.min': 'Nome deve ter pelo menos 3 caracteres',
  }),
  email: joi.string().email().required().messages({
    'any.required': 'Campo de e-mail não pode ser vazio',
    'string.empty': 'Campo de e-mail não pode ser vazio',
    'string.base': 'E-mail precisa ser do tipo string',
    'string.email': 'E-mail inválido',
  }),
  password: joi
    .string()
    .min(10)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/)
    .required()
    .messages({
      'any.required': 'Campo de senha não pode ser vazio',
      'string.empty': 'Campo de senha não pode ser vazio',
      'string.base': 'Senha precisa ser do tipo string',
      'string.min': 'A senha deve ter no mínimo 10 caracteres',
      'string.pattern.base': 'A senha não atende aos requisitos',
    }),
})
