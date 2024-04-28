import { Module } from '@nestjs/common';
import { AuthCustomService } from './auth-custom.service';

@Module({
  providers: [AuthCustomService],
  exports: [AuthCustomService],
})
export class AuthCustomModule { }
