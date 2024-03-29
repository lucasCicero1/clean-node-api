import { DbLoadAccountByToken } from '@/data/usecases/load-account-by-token/db-load-account-by-token'
import type { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import env from '@/main/config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtScret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
