import { Global, Module } from '@nestjs/common';
import { CustomGuardService } from './custom-guard.service';

@Global()
@Module({
  providers: [CustomGuardService],
  exports: [CustomGuardService]
})
export class CustomGuardModule { }
