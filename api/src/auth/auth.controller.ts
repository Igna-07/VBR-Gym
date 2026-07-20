import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common'
import type { Request, Response } from 'express'
import { AuthService } from './auth.service'
import type { AuthenticatedRequest } from './auth.guard'
import { CredentialsDto } from './dto/credentials.dto'
import { Public } from './public.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public() @Get('status') status() { return this.authService.status() }
  @Public() @Post('setup') setup(@Body() data: CredentialsDto, @Res({ passthrough: true }) response: Response) { return this.authService.setup(data, response) }
  @Public() @Post('login') login(@Body() data: CredentialsDto, @Res({ passthrough: true }) response: Response) { return this.authService.login(data, response) }
  @Get('me') me(@Req() request: AuthenticatedRequest) { return request.adminUser }
  @Post('logout') logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const token = request.headers.cookie?.split(';').map((part) => part.trim()).find((part) => part.startsWith('vbr_session='))?.split('=')[1]
    return this.authService.logout(token ? decodeURIComponent(token) : undefined, response)
  }
}
