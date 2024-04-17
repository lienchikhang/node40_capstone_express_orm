import { Body, Controller, Get, HttpCode, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from './user.service';
import { UserDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @HttpCode(200)
    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    getInfo(
        @Req() req: Request,
    ) {
        return this.userService.getInfo(Number(req.user))
    }

    @HttpCode(200)
    @Put('adjust')
    @UseGuards(AuthGuard('jwt'))
    adjustInfo(
        @Req() req: Request,
        @Body() data: UserDto, //UserFullNameDto | UserAvatarDto | UserAgeDto | UserPassDto
    ) {
        return this.userService.adjustInfo(Number(req.user), data);
    }

    @HttpCode(200)
    @Put('adjust-avatar')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    adjustAvatarInfo(
        @Req() req: Request,
        @UploadedFile() file: Express.Multer.File
    ) {
        console.log({ file })
        return this.userService.adjustAvatarInfo(Number(req.user), file);
    }
}
