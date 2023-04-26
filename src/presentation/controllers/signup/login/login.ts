import { InvalidParamError, MissingParamsError } from '../../../erros'
import { badRequest, serverError } from '../../../helpers/http-helper'
import type { HttpRequest, HttpResponse, Controller, EmailValidator } from '../signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const fields = ['email', 'password']

      for (const field of fields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsError(field))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) return badRequest(new InvalidParamError('email'))

      return await Promise.resolve({
        statusCode: 200,
        body: {}
      })
    } catch (error) {
      return serverError(error)
    }
  }
}
