import type { Controller, HttpRequest } from '../../presentation/protocols'
import type { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const { statusCode, body } = await controller.handle(httpRequest)
    if (statusCode === 500) {
      return res.status(statusCode).json({
        error: body.message
      })
    }
    res.status(statusCode).json(body)
  }
}
