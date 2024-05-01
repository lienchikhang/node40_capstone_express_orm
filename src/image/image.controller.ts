import { Body, Controller, Delete, Get, Headers, HttpCode, Param, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ImageService } from './image.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CommentDto, ImageDto, QImgDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthCustomService } from 'src/auth-custom/auth-custom.service';

@Controller('image')
export class ImageController {
  constructor(
    private readonly imageService: ImageService,
  ) { }

  @HttpCode(200)
  @Get('get-all')
  @UseGuards(AuthCustomService)
  getImages(
    @Query('page') page: number,
    @Query('qName') qName: string,
    @Req() req: Request,
  ) {

    return this.imageService.getImages(page && Number(page), qName, Number(req.user));
  }

  @HttpCode(200)
  @Get('get-detail/:id')
  @UseGuards(AuthCustomService)
  getImageById(
    @Param('id') pid: number,
    @Query('qCmt') qCmt: number,
    @Req() req: Request,
    @Headers() header,
  ) {
    console.log('header', header);
    console.log('req:: ', req.user)
    return this.imageService.getImageById(Number(pid), qCmt && Number(qCmt), Number(req.user));
  }

  @HttpCode(201)
  @Post('add-comment/:qImg')
  @UseGuards(AuthCustomService)
  addComment(
    @Body() body: CommentDto,
    @Param('qImg') qImg: QImgDto,
    @Req() req: Request,
  ) {
    console.log({ qImg })
    return this.imageService.addComment(Number(qImg), body, Number(req.user));
  }

  @HttpCode(200)
  @Get('me')
  @UseGuards(AuthCustomService)
  getImagesByUserId(
    @Req() req: Request,
    @Query('page') page: number
  ) {
    return this.imageService.getImagesByUserId(Number(req.user), page && Number(page));
  }

  @HttpCode(200)
  @Get('save')
  @UseGuards(AuthCustomService)
  getSaveImagesByUserId(
    @Req() req: Request,
    @Query('page') page: number
  ) {
    return this.imageService.getSaveImagesByUserId(Number(req.user), page && Number(page));
  }

  @HttpCode(200)
  @Delete('delete/:imgId')
  @UseGuards(AuthCustomService)
  deleteImageById(
    @Param('imgId') imgId: number,
    @Req() req: Request
  ) {
    return this.imageService.deleteImageById(Number(req.user), Number(imgId));
  }

  @HttpCode(201)
  @Post('save/:id')
  @UseGuards(AuthCustomService)
  saveImage(
    @Param('id') imdId: number,
    @Req() req: Request,
  ) {
    return this.imageService.saveImage(Number(req.user), Number(imdId));
  }

  @HttpCode(201)
  @Post('create')
  @UseGuards(AuthCustomService)
  createImage(
    @Body() body: ImageDto,
    @Req() req: Request,
  ) {
    return this.imageService.createImage(Number(req.user), body);
  }

  @HttpCode(201)
  @Post('upload/:id')
  @UseGuards(AuthCustomService)
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Req() req: Request,
    @Param('id') imgId: number,
    @UploadedFile() uploadImg: Express.Multer.File
  ) {
    return this.imageService.uploadImage(uploadImg, Number(req.user), Number(imgId))
  }
}
