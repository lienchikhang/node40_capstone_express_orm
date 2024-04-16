import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';


const tempPath = path.join(process.cwd(), 'public', 'images', 'temp');
const finalPath = path.join(process.cwd(), 'public', 'images', 'final');

@Injectable()
export class CompressImageService {
    async compress(file: string) {
        const rs = await sharp(path.join(tempPath, file))
            .png({ quality: 10 })
            .toFile(path.join(finalPath, file))
        return rs;
    }
}
