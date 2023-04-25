import { MissingParamsError } from '../../../erros'
import { badRequest } from '../../../helpers/http-helper'
import type { HttpRequest, HttpResponse, Controller } from '../signup-protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const fields = ['email', 'password']

    for (const field of fields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamsError(field))
      }
    }

    return await Promise.resolve({
      statusCode: 200,
      body: {}
    })
  }
}
