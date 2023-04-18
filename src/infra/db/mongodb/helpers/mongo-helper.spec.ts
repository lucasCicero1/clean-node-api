import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(String(process.env.MONGO_URL))
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let collection = await sut.getCollection('accounts')
    expect(collection).toBeTruthy()
    await sut.disconnect()
    collection = await sut.getCollection('accounts')
    expect(collection).toBeTruthy()
  })
})
