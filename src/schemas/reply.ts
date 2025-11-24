import joi from 'joi'

export const createReplySchema = joi.object({
  description: joi.string().min(10).max(500).required().messages({
    'any.required': 'Campo descrição não pode ser vazio',
    'string.empty': 'Campo descrição não pode ser vazio',
    'string.base': 'Descrição precisa ser do tipo string',
    'string.min': 'A descrição precisa ter no mínimo 10 caracteres',
    'string.max': 'A descrição pode ter no máximo 500 caracteres',
  }),
  complaintId: joi.string().uuid().required().messages({
    'any.required': 'Campo complaintId não pode ser vazio',
    'string.empty': 'Campo complaintId não pode ser vazio',
    'string.base': 'complaintId precisa ser do tipo string',
    'string.guid': 'complaintId precisa ser um UUID válido',
  }),
})
