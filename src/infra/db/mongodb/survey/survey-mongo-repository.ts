import type { AddSurveyModel } from '../../../../domain/usecases/add-survey'
import type { AddSurveyRepository } from '../../../../data/protocols/db/survey/add-survey-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const collection = await MongoHelper.getCollection('surveys')
    await collection.insertOne(surveyData)
  }
}
