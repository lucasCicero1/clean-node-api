import { InvalidParamError, MissingParamError } from '../../presentation/erros'
import { type Validation } from '../../presentation/protocols'
import { ValidationComposite } from './validation-composite'

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | undefined {
      return undefined
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [
    makeValidationStub(),
    makeValidationStub()
  ]
  const sut = new ValidationComposite(validationStubs)

  return {
    sut,
    validationStubs
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(
      new MissingParamError('any_param')
    )

    const validateResponse = sut.validate({ any: 'any' })
    expect(validateResponse).toEqual(new MissingParamError('any_param'))
  })

  test('Should return the first error if two validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(
      new MissingParamError('any_param')
    )
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(
      new InvalidParamError('any_param')
    )

    const validateResponse = sut.validate({ any: 'any' })
    expect(validateResponse).toEqual(new MissingParamError('any_param'))
  })

  test('Should return nothing if all validations pass', () => {
    const { sut } = makeSut()

    const validateResponse = sut.validate({ any: 'any' })
    expect(validateResponse).toBeFalsy()
  })
})
