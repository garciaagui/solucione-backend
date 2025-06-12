import { HttpException } from '@/utils/exceptions'
import { NextFunction, Request, Response } from 'express'

export default function errorMiddleware(
  err: HttpException,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { status, message } = err as HttpException
  res.status(status || 500).json({ message })
}
