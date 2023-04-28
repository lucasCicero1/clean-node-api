import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamsError } from '../../erros'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('email')
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut()

    const validateResponse = sut.validate({ name: 'any_name' })
    expect(validateResponse).toEqual(new MissingParamsError('email'))
  })

  test('Should return nothing if validation pass', () => {
    const sut = makeSut()

    const validateResponse = sut.validate({ email: 'any_email' })
    expect(validateResponse).toBeFalsy()
  })
})
