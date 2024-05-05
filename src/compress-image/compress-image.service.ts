import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import Jimp from "jimp";

const tempPath = path.join(process.cwd(), 'public', 'images', 'temp');
const finalPath = path.join(process.cwd(), 'public', 'images', 'final');

@Injectable()
export class CompressImageService {
    async compress(file: string) {
        // const rs = await sharp(path.join(tempPath, file))
        //     .png({ quality: 10 })
        //     .toFile(path.join(finalPath, file))

        console.log('file name', file);

        // const rs = gm(path.join(tempPath, file)).quality(10).write(path.join(finalPath, file), (err) => {
        //     if (err) console.log('err in compress', err);
        // })
        // return rs;

        return new Promise((resolve, reject) => {
            Jimp.read(path.join(tempPath, file))
                .then(image => {
                    return image
                        .quality(10)
                        .write(path.join(finalPath, file));
                })
                .then(() => {
                    console.log('Đã thay đổi kích thước ảnh và lưu vào', path.join(finalPath, file));
                    resolve(path.join(finalPath, file)); // Giải quyết Promise với đường dẫn của ảnh đầu ra
                })
                .catch(err => {
                    console.error('Đã xảy ra lỗi:', err);
                    reject(err); // Reject Promise nếu có lỗi
                });
        });
    }
}
