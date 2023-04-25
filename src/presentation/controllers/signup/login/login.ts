import { MissingParamsError } from '../../../erros'
import { badRequest } from '../../../helpers/http-helper'
import type { HttpRequest, HttpResponse, Controller } from '../signup-protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return badRequest(new MissingParamsError('email'))
  }
}
