import { prisma } from "./db"
import crypto from "crypto"

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex")
}

export async function createUser(email: string, name: string, password: string) {
  const hashedPassword = hashPassword(password)
  return prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  })
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return hashPassword(password) === hashedPassword
}
