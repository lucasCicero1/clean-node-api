import type { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import type { AccountModel } from '../../../domain/models/account'
import type { Decrypter } from '../../protocols/criptography'
import type { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel | null> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    return null
  }
}
