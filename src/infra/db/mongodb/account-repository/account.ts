import type { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import type { AddAccountModel } from '../../../../domain/usecases/add-account'
import type { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'
import { type LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const collection = await MongoHelper.getCollection('accounts')
    await collection.insertOne(accountData)
    return MongoHelper.mapper(accountData)
  }

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const collection = await MongoHelper.getCollection('accounts')
    const account = await collection.findOne({ email })
    return account && MongoHelper.mapper(account)
  }
}
