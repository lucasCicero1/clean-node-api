import { ObjectId } from 'mongodb'
import { type AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { type LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { type UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { type LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { type AddAccountModel } from '@/domain/usecases/add-account'
import { type AccountModel } from '@/domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const collection = await MongoHelper.getCollection('accounts')
    const { insertedId } = await collection.insertOne(accountData)
    return MongoHelper.mapper({ _id: insertedId, ...accountData })
  }

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const collection = await MongoHelper.getCollection('accounts')
    const account = await collection.findOne({ email })
    return account && MongoHelper.mapper(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const collection = await MongoHelper.getCollection('accounts')
    await collection.updateOne({ _id: new ObjectId(id) }, {
      $set: { accessToken: token }
    })
  }

  async loadByToken (token: string, role?: string): Promise<AccountModel | null> {
    const collection = await MongoHelper.getCollection('accounts')
    const account = await collection.findOne(
      { accessToken: token, $or: [{ role }, { role: 'admin' }] }
    )
    return account && MongoHelper.mapper(account)
  }
}
