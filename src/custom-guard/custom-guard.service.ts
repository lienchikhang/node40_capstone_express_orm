import { BadRequestException, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CustomGuardService extends AuthGuard('jwt') {
    handleRequest(err, user, info: Error, context: ExecutionContext) {
        // Xử lý sau khi gọi tới strategy
        if (info instanceof TokenExpiredError) {
            const token = this.extractTokenFromRequest(context);
            const payload = this.decodeToken(token)
            return payload;
        } else if (info instanceof JsonWebTokenError) {
            throw new UnauthorizedException('Invalid token');
        } else {
            throw new BadRequestException('Token is still good!');
        }
    }

    private extractTokenFromRequest(context: ExecutionContext): string {
        const request = context.switchToHttp().getRequest();
        // Thay đổi cách bạn trích xuất token từ yêu cầu dựa trên cách bạn gửi token trong yêu cầu
        const token = request.headers.authorization.split(' ')[1];
        return token;
    }

    private decodeToken(token: string): any {
        try {
            const decoded = jwt.decode(token);
            return decoded;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}
