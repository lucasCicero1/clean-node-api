import type { WithId } from 'mongodb'
import type { SurveyModel } from '../../../../domain/models/survey'
import type { AddSurveyModel } from '../../../../domain/usecases/add-survey'
import type { LoadSurveysRepository } from '../../../../data/protocols/db/survey/load-surveys-repository'
import type { AddSurveyRepository } from '../../../../data/protocols/db/survey/add-survey-repository'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const collection = await MongoHelper.getCollection('surveys')
    await collection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const collection = await MongoHelper.getCollection('surveys')
    const surveys = await collection.find().toArray() as WithId<SurveyModel[]> | []
    return surveys
  }
}
