import { Body, Controller, Get, HttpCode, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ImageService } from './image.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CommentDto, QImgDto } from './dto';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

  @HttpCode(200)
  @Get('get-all')
  getImages(
    @Query('qRecord') qRecord: number,
    @Query('qName') qName: string
  ) {
    console.log({ qRecord, qName })
    return this.imageService.getImages(qRecord && Number(qRecord), qName);
  }

  @HttpCode(200)
  @Get('get-detail/:id')
  @UseGuards(AuthGuard('jwt'))
  getImageById(
    @Param('id') pid: number,
    @Query('qCmt') qCmt: number,
    @Req() req: Request,
  ) {
    console.log('req:: ', req.user)
    return this.imageService.getImageById(Number(pid), qCmt && Number(qCmt), Number(req.user));
  }

  @HttpCode(201)
  @Post('add-comment')
  @UseGuards(AuthGuard('jwt'))
  addComment(
    @Body() body: CommentDto,
    @Query('qImg') qImg: QImgDto,
    @Req() req: Request,
  ) {
    return this.imageService.addComment(Number(qImg), body, Number(req.user));
  }

  @HttpCode(200)
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getImagesByUserId(
    @Req() req: Request,
    @Query('qRecord') qRecord: number
  ) {
    return this.imageService.getImagesByUserId(Number(req.user), qRecord && Number(qRecord));
  }

  @HttpCode(200)
  @Get('save')
  @UseGuards(AuthGuard('jwt'))
  getSaveImagesByUserId(
    @Req() req: Request,
    @Query('qRecord') qRecord: number
  ) {
    return this.imageService.getSaveImagesByUserId(Number(req.user), qRecord && Number(qRecord));
  }
}
