import type { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import type { AddAccountModel } from '../../../../domain/usecases/add-account'
import type { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const collection = await MongoHelper.getCollection('accounts')
    await collection.insertOne(accountData)
    return MongoHelper.mapper(accountData)
  }
}
