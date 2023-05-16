import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { type Collection } from 'mongodb'
import { hash } from 'bcrypt'

let collection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL))
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    collection = await MongoHelper.getCollection('accounts')
    await collection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'any',
          email: 'any@mail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const hashedPassword = await hash('123', 12)
      await collection.insertOne({
        name: 'any',
        email: 'any@mail.com',
        password: hashedPassword
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'any@mail.com',
          password: '123'
        })
        .expect(200)
    })
  })
})
