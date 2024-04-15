import { Controller, Get, HttpCode, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ImageService } from './image.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

  @HttpCode(200)
  @Get()
  getImages(
    @Query('qRecord') qRecord: number,
    @Query('qName') qName: string
  ) {
    console.log({ qRecord, qName })
    return this.imageService.getImages(qRecord && Number(qRecord), qName);
  }

  @HttpCode(200)
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getImageById(
    @Param('id') pid: number,
    @Query('qCmt') qCmt: number,
    @Req() req: Request,
  ) {
    console.log('req:: ', req.user)
    return this.imageService.getImageById(Number(pid), qCmt && Number(qCmt), Number(req.user));
  }
}
