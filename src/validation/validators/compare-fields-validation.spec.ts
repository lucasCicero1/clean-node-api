import { CompareFieldsValidation } from './compare-fields-validation'
import { InvalidParamError } from '../../presentation/erros'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('password', 'passwordConfirmation')
}

describe('CompareFields Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const validateResponse = sut.validate({
      password: '123',
      passwordConfirmation: '12'
    })
    expect(validateResponse).toEqual(new InvalidParamError('passwordConfirmation'))
  })

  test('Should return nothing if validation pass', () => {
    const sut = makeSut()
    const validateResponse = sut.validate({
      password: '123',
      passwordConfirmation: '123'
    })

    expect(validateResponse).toBeFalsy()
  })
})
