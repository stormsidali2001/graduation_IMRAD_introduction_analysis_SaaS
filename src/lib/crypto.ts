import * as bcrypt from "bcryptjs";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(hash: string, password: string) {
  return bcrypt.compare(password, hash);
}
