import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import type { AuthenticatedRequest } from './auth.guard';
import { CredentialsDto } from './dto/credentials.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    status(): Promise<{
        hasAdmin: boolean;
    }>;
    setup(data: CredentialsDto, response: Response): Promise<{
        id: string;
        email: string;
    }>;
    login(data: CredentialsDto, response: Response): Promise<{
        id: string;
        email: string;
    }>;
    me(request: AuthenticatedRequest): {
        id: string;
        email: string;
    } | undefined;
    logout(request: Request, response: Response): Promise<{
        success: boolean;
    }>;
}
