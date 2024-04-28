import { Global, Module } from '@nestjs/common';
import { CustomjwtService } from './customjwt.service';
import { CustomjwtController } from './customjwt.controller';

@Global()
@Module({
  providers: [CustomjwtService],
  exports: [CustomjwtService],
})
export class CustomjwtModule { }
