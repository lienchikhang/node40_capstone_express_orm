import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';
import * as gm from 'gm';

const tempPath = path.join(process.cwd(), 'public', 'images', 'temp');
const finalPath = path.join(process.cwd(), 'public', 'images', 'final');

@Injectable()
export class CompressImageService {
    async compress(file: string) {
        // const rs = await sharp(path.join(tempPath, file))
        //     .png({ quality: 10 })
        //     .toFile(path.join(finalPath, file))

        const rs = gm(path.join(tempPath, file)).quality(10).write(path.join(finalPath, file), (err) => {
            if (err) console.log('err in compress', err);
        })
        return rs;
    }
}
