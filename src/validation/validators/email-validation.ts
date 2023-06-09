import { InvalidParamError } from '../../presentation/erros'
import { type EmailValidator } from '../protocols/email-validator'
import { type Validation } from '../../presentation/protocols'

export class EmailValidation implements Validation {
  constructor (
    private readonly field: string,
    private readonly emailValidator: EmailValidator
  ) {}

  validate (input: any): Error | undefined {
    const isValid = this.emailValidator.isValid(input[this.field])
    if (!isValid) {
      return new InvalidParamError(this.field)
    }
  }
}
