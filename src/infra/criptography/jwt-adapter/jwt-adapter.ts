import { type Encrypter } from '../../../data/protocols/criptography'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  private readonly secret: string

  constructor (secret: string) {
    this.secret = secret
  }

  encrypt (value: string): string {
    jwt.sign({ id: value }, this.secret)
    return ''
  }
}
