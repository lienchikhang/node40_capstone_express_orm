import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { CompressImageModule } from 'src/compress-image/compress-image.module';
import { CloundinaryModule } from 'src/cloundinary/cloundinary.module';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: path.join(process.cwd(), 'public', 'images', 'temp'),
        filename(req, file, callback) {
          callback(null, new Date().getTime().toString() + '.' + file.originalname.split('.')[1]);
        },
      }),
      limits: {
        files: 1,
        fileSize: 30 * 1024 * 1024,
      }
    }),
    CompressImageModule,
    CloundinaryModule,
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule { }
