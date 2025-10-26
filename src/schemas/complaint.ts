import joi from 'joi'

export const createComplaintSchema = joi.object({
  title: joi.string().min(10).max(127).required().messages({
    'any.required': 'Campo título não pode ser vazio',
    'string.empty': 'Campo título não pode ser vazio',
    'string.base': 'Título precisa ser do tipo string',
    'string.min': 'O título precisa ter no mínimo 10 caracteres',
    'string.max': 'O título pode ter no máximo 127 caracteres',
  }),
  description: joi.string().min(40).max(255).required().messages({
    'any.required': 'Campo descrição não pode ser vazio',
    'string.empty': 'Campo descrição não pode ser vazio',
    'string.base': 'Descrição precisa ser do tipo string',
    'string.min': 'A descrição precisa ter no mínimo 40 caracteres',
    'string.max': 'A descrição pode ter no máximo 255 caracteres',
  }),
  street: joi.string().required().messages({
    'any.required': 'Campo rua não pode ser vazio',
    'string.empty': 'Campo rua não pode ser vazio',
    'string.base': 'Rua precisa ser do tipo string',
  }),
  neighborhood: joi.string().required().messages({
    'any.required': 'Campo bairro não pode ser vazio',
    'string.empty': 'Campo bairro não pode ser vazio',
    'string.base': 'Bairro precisa ser do tipo string',
  }),
  // Even though the required is 8 digits, we consider 10 because of the dot and hyphen. Example: 18.540-000.
  zipCode: joi.string().length(10).required().messages({
    'any.required': 'Campo CEP não pode ser vazio',
    'string.empty': 'Campo CEP não pode ser vazio',
    'string.base': 'CEP precisa ser do tipo string',
    'string.length': 'CEP deve ter exatamente 8 dígitos',
  }),
  addressReference: joi.string().messages({
    'string.empty': 'Campo referência não pode ser vazio',
    'string.base': 'Referência precisa ser do tipo string',
  }),
})
