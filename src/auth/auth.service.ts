import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { LoginDto, RegisterDto, TokenDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashSync, compareSync } from 'bcrypt'
import { ResponseService } from 'src/response/response.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private response: ResponseService,
        private jwt: JwtService,
        private config: ConfigService,
    ) { }

    async register(data: RegisterDto) {
        try {

            //check email exist
            const isExist = await this.prisma.user.findFirst({
                where: {
                    email: data.email
                }
            })

            if (isExist) throw new ConflictException(this.response.create(409, 'Email has already existed', data.email));

            //encrypt password
            const hashPass = hashSync(data.password, 7);

            //create user
            await this.prisma.user.create({
                data: {
                    email: data.email,
                    password: hashPass,
                    full_name: data.fullName,
                    age: data.age
                }
            })

            return this.response.create(201, 'Register successfully!');
        } catch (error) {
            console.log({ error })
            if (error.status === 500) throw new InternalServerErrorException(this.response.create(500, 'Internal Server Error'));
            throw error;
        }
    }

    async login(data: LoginDto) {
        try {
            //check email exist
            const isExist = await this.prisma.user.findFirst({
                where: {
                    email: data.email
                }
            })
            if (!isExist) throw new NotFoundException(this.response.create(404, 'Email not exist', data.email));

            //check password
            const isCorrectPass = compareSync(data.password, isExist.password);
            console.log({ isCorrectPass })
            if (!isCorrectPass) throw new BadRequestException(this.response.create(400, 'Email or password is not correct!', { email: data.email, password: data.password }));

            //create acccessToken & refreshToken
            const accessToken = await this.createAccessToken({
                userId: isExist.user_id,
            })

            const refreshToken = await this.createRefreshToken({
                userId: isExist.user_id,
            })

            //save refreshToken to database
            await this.prisma.user.update({
                data: {
                    refresh_token: refreshToken
                },
                where: {
                    user_id: isExist.user_id,
                }
            })

            return this.response.create(200, 'Login successfully!', accessToken);
        } catch (error) {
            console.log({ error })
            if (error.status === 500) throw new InternalServerErrorException(this.response.create(500, 'Internal Server Error'));
            throw error;
        }
    }

    async refreshToken(payload) {
        try {
            const userId = Number(payload.userId);

            //check user exist
            const user = await this.prisma.user.findUnique({
                where: {
                    user_id: userId,
                }
            })
            if (!user) throw new NotFoundException(this.response.create(404, 'User not found'));

            //verify refreshToken
            await this.verifyRefreshToken(user.refresh_token);

            //create new accessToken
            const newAccessToken = await this.createAccessToken({
                userId: user.user_id,
            })

            return this.response.create(201, 'Refresh successfully!', newAccessToken);
        } catch (error) {
            if (error.status === 500) throw new InternalServerErrorException(this.response.create(500, 'Internal Server Error'));
            throw error;
        }

    }

    createAccessToken(payload: TokenDto) {
        return this.jwt.signAsync(payload, {
            secret: this.config.get('SECRET_KEY'),
            expiresIn: '20s',
        })
    }

    createRefreshToken(payload: TokenDto) {
        return this.jwt.signAsync(payload, {
            secret: this.config.get('SECRET_REFRESH_KEY'),
            expiresIn: '1d',
        })
    }

    verifyRefreshToken(refreshToken: string) {
        return this.jwt.verifyAsync(refreshToken, {
            secret: this.config.get('SECRET_REFRESH_KEY')
        })
    }
}
