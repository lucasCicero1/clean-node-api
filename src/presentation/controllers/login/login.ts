import { InvalidParamError, MissingParamsError } from '../../erros'
import { badRequest, serverError, unauthorized, ok } from '../../helpers/http-helper'
import type {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator,
  Authentication
} from './login-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const fields = ['email', 'password']

      for (const field of fields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamsError(field))
        }
      }

      const { email, password } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) return badRequest(new InvalidParamError('email'))

      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) return unauthorized()

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}