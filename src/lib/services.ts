import * as bcrypt from 'bcrypt'

export function hashPassword(pass: string) {
  return bcrypt.hash(pass, 12)
}
