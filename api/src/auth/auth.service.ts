import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'crypto'
import type { Response } from 'express'
import { promisify } from 'util'
import { PrismaService } from '../prisma.service'
import { CredentialsDto } from './dto/credentials.dto'
import { clearLoginFailures, loginBlocked, recordLoginFailure } from './login-limit'

const scrypt = promisify(scryptCallback)

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async status() { return { hasAdmin: (await this.prisma.adminUser.count()) > 0 } }

  async setup(data: CredentialsDto, response: Response) {
    if (await this.prisma.adminUser.count()) throw new BadRequestException('El administrador ya fue creado.')
    const email = data.email.trim().toLowerCase()
    const salt = randomBytes(16).toString('hex')
    const passwordHash = (await scrypt(data.password, salt, 64) as Buffer).toString('hex')
    const user = await this.prisma.adminUser.create({ data: { email, passwordSalt: salt, passwordHash } })
    await this.createSession(user.id, response)
    return { id: user.id, email: user.email }
  }

  async login(data: CredentialsDto, response: Response) {
    const key = data.email.trim().toLowerCase()
    if (loginBlocked(key)) throw new HttpException('Demasiados intentos. Probá de nuevo en 15 minutos.', HttpStatus.TOO_MANY_REQUESTS)
    const user = await this.prisma.adminUser.findUnique({ where: { email: key } })
    if (!user) { recordLoginFailure(key); throw new UnauthorizedException('Correo o contraseña incorrectos.') }
    const candidate = await scrypt(data.password, user.passwordSalt, 64) as Buffer
    const expected = Buffer.from(user.passwordHash, 'hex')
    if (candidate.length !== expected.length || !timingSafeEqual(candidate, expected)) { recordLoginFailure(key); throw new UnauthorizedException('Correo o contraseña incorrectos.') }
    clearLoginFailures(key)
    await this.createSession(user.id, response)
    return { id: user.id, email: user.email }
  }

  async logout(token: string | undefined, response: Response) {
    if (token) await this.prisma.authSession.deleteMany({ where: { tokenHash: createHash('sha256').update(token).digest('hex') } })
    response.clearCookie('vbr_session', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/' })
    return { success: true }
  }

  private async createSession(userId: string, response: Response) {
    const token = randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    await this.prisma.authSession.create({ data: { userId, tokenHash: createHash('sha256').update(token).digest('hex'), expiresAt } })
    response.cookie('vbr_session', token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 7 * 24 * 60 * 60 * 1000, path: '/' })
  }
}
