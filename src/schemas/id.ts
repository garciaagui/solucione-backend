import joi from 'joi'

export const idSchema = joi.string().uuid()
