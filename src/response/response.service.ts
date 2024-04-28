import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
    create(status: number, mess: string, content?: any) {
        return {
            status,
            message: mess,
            content
        }
    }
}
