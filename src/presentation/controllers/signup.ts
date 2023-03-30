import type { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamsError } from '../erros/missing-params-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamsError('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamsError('email'))
    }

    return badRequest(new MissingParamsError('some error'))
  }
}
