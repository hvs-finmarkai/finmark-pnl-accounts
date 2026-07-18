import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

const SECRET = process.env.JWT_SECRET || "finmark-secret-key-change-in-production"

export interface TokenPayload {
  userId: number
  email: string
  role: string
  name: string
}

export function createToken(payload: TokenPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, SECRET) as TokenPayload
  } catch {
    return null
  }
}

export function getTokenFromCookies(): string | null {
  const cookieStore = cookies()
  return cookieStore.get("token")?.value || null
}

export function getCurrentUser(): TokenPayload | null {
  const token = getTokenFromCookies()
  if (!token) return null
  return verifyToken(token)
}
