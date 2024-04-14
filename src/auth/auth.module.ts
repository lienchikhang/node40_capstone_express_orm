import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ResponseModule } from 'src/response/response.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
