import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CustomGuardService } from 'src/custom-guard/custom-guard.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(201)
    @Post('register')
    register(@Body() body: RegisterDto) {
        return this.authService.register(body);
    }

    @HttpCode(200)
    @Post('login')
    login(@Body() body: LoginDto) {
        return this.authService.login(body);
    }

    @Post('refresh')
    @UseGuards(CustomGuardService)
    refresh(@Req() req: Request) {
        return this.authService.refreshToken(req.user);
    }
}
