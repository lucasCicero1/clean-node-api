import type { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamsError } from '../erros/missing-params-error'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamsError(field))
      }
    }

    return badRequest(new MissingParamsError('some error'))
  }
}
