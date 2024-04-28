import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class CustomjwtService {
    decode(token: string) {
        const payload = jwt.decode(token);
        console.log('payload', payload);
        return payload
    }
}
