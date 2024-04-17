import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CompressImageModule } from 'src/compress-image/compress-image.module';
import { CloundinaryModule } from 'src/cloundinary/cloundinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Module({
  imports: [
    PrismaModule,
    CompressImageModule,
    CloundinaryModule,
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
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
