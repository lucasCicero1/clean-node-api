import { type Collection, type ObjectId, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(String(process.env.MONGO_URL))
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  mapper (account: any, insertedId: ObjectId): any {
    const id = insertedId.toString().split('"').join()
    return Object.assign({}, account, { id })
  }
}
