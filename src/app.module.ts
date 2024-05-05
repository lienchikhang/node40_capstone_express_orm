import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { ResponseModule } from './response/response.module';
import { CustomGuardModule } from './custom-guard/custom-guard.module';
import { ImageModule } from './image/image.module';
import { CompressImageModule } from './compress-image/compress-image.module';
import { CloundinaryModule } from './cloundinary/cloundinary.module';
import { AuthCustomModule } from './auth-custom/auth-custom.module';
import { CustomjwtModule } from './customjwt/customjwt.module';
import { AuthCheckModule } from './auth-check/auth-check.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    JwtModule.register({ global: true }),
    ResponseModule,
    CustomGuardModule,
    ImageModule,
    CompressImageModule,
    CloundinaryModule,
    AuthCustomModule,
    CustomjwtModule,
    AuthCheckModule,
    CacheModule.register({
      ttl: 100000,
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
