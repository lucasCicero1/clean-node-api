import type { HttpRequest, HttpResponse, Controller, AddAccount, Validation } from './signup-controller-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) return badRequest(error)

      const { name, email, password } = httpRequest.body

      const response = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(response)
    } catch (err) {
      return serverError(err)
    }
  }
}
