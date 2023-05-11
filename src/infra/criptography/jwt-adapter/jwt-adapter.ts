import { type Encrypter } from '../../../data/protocols/criptography'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) {}

  encrypt (value: string): string {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return accessToken
  }
}
