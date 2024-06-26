import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthCustomService } from 'src/auth-custom/auth-custom.service';
import { CustomGuardService } from 'src/custom-guard/custom-guard.service';
import { AuthCheckService } from 'src/auth-check/auth-check.service';

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

    @HttpCode(201)
    @Post('refresh')
    @UseGuards(CustomGuardService)
    refresh(@Req() req: Request) {
        console.log('req.user', req.user);
        return this.authService.refreshToken(req.user);
    }

    @HttpCode(200)
    @Post('check')
    @UseGuards(AuthCheckService)
    checkValid(@Req() req: Request) {
        console.log('pass auth', req.user);
        return true;
    }
}
