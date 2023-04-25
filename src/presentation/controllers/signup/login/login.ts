import { MissingParamsError } from '../../../erros'
import { badRequest } from '../../../helpers/http-helper'
import type { HttpRequest, HttpResponse, Controller, EmailValidator } from '../signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const fields = ['email', 'password']

    for (const field of fields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamsError(field))
      }
    }

    this.emailValidator.isValid(httpRequest.body.email)

    return await Promise.resolve({
      statusCode: 200,
      body: {}
    })
  }
}
