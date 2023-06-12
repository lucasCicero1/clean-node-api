import { DbAddSurvey } from './db-add-survey'
import type { AddSurveyRepository, AddSurveyModel } from './db-add-survey-protocols'

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (data: AddSurveyModel): Promise<void> {
      await Promise.resolve()
    }
  }
  return new AddSurveyRepositoryStub()
}

interface SutTypes {
  sut: DbAddSurvey
  AddSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
  const AddSurveyRepositoryStub = makeAddSurveyRepository()
  const sut = new DbAddSurvey(AddSurveyRepositoryStub)
  return {
    sut,
    AddSurveyRepositoryStub
  }
}

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

describe('DbAddSurvey UseCase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, AddSurveyRepositoryStub } = makeSut()
    const AddSurveyRepositorySpy = jest.spyOn(AddSurveyRepositoryStub, 'add')
    const surveyData = makeFakeSurveyData()
    await sut.add(surveyData)
    expect(AddSurveyRepositorySpy).toHaveBeenCalledWith(surveyData)
  })
})
