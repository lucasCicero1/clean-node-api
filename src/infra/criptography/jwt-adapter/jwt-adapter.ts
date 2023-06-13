import type { Encrypter, Decrypter } from '../../../data/protocols/criptography'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  encrypt (value: string): string {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  decrypt (value: string): string | null {
    jwt.verify(value, this.secret)
    return null
  }
}
