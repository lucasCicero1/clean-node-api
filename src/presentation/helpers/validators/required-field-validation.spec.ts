import { RequiredFieldValidation } from './required-field-validation'
import { MissingParamsError } from '../../erros'

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('email')

    const validateResponse = sut.validate({ name: 'any_name' })
    expect(validateResponse).toEqual(new MissingParamsError('email'))
  })
})
