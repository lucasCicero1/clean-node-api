import { InvalidParamError } from '../../erros'
import { type EmailValidator } from '../../protocols/email-validator'
import { type Validation } from '../../protocols/validation'

export class EmailValidation implements Validation {
  private readonly field: string
  private readonly emailValidator: EmailValidator

  constructor (field: string, emailValidator: EmailValidator) {
    this.field = field
    this.emailValidator = emailValidator
  }

  validate (input: any): Error | undefined {
    const isValid = this.emailValidator.isValid(input[this.field])
    if (!isValid) {
      return new InvalidParamError(this.field)
    }
  }
}
