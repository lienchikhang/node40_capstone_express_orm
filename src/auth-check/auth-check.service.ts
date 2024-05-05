import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthCheckService extends AuthGuard('jwt') {
    handleRequest(err, user, info: Error, context: ExecutionContext) {
        // Xử lý sau khi gọi tới strategy
        console.log('err', info)
        if (info instanceof JsonWebTokenError) {
            throw new UnauthorizedException('JsonWebTokenError');
        } else {
            const token = this.extractTokenFromRequest(context);
            const payload = this.decodeToken(token)
            console.log({ payload })
            return payload?.userId;
        }
    }

    private extractTokenFromRequest(context: ExecutionContext): string {
        const request = context.switchToHttp().getRequest();
        console.log('reqqqqq', request);
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
