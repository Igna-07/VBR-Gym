import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { createHash } from 'crypto'
import type { Request } from 'express'
import { PrismaService } from '../prisma.service'
import { IS_PUBLIC_KEY } from './public.decorator'

export type AuthenticatedRequest = Request & { adminUser?: { id: string; email: string } }

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    if (this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])) return true
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>()
    const cookies = Object.fromEntries((request.headers.cookie || '').split(';').map((part) => part.trim().split('=').map(decodeURIComponent)).filter((pair) => pair.length === 2))
    const token = cookies.vbr_session
    if (!token) throw new UnauthorizedException('Iniciá sesión para continuar.')
    const tokenHash = createHash('sha256').update(token).digest('hex')
    const session = await this.prisma.authSession.findUnique({ where: { tokenHash }, include: { user: true } })
    if (!session || session.expiresAt <= new Date()) {
      if (session) await this.prisma.authSession.delete({ where: { id: session.id } })
      throw new UnauthorizedException('La sesión venció. Iniciá sesión nuevamente.')
    }
    request.adminUser = { id: session.user.id, email: session.user.email }
    return true
  }
}
