import { Module } from '@nestjs/common';
import { CompressImageService } from './compress-image.service';


@Module({
  providers: [CompressImageService],
  exports: [CompressImageService]
})
export class CompressImageModule { }
