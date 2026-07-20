import type { Response } from 'express';
import { PrismaService } from '../prisma.service';
import { CredentialsDto } from './dto/credentials.dto';
export declare class AuthService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    logout(token: string | undefined, response: Response): Promise<{
        success: boolean;
    }>;
    private createSession;
}
