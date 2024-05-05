import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as path from 'path';
import * as fs from 'fs';


const finalPath = path.join(process.cwd(), 'public', 'images', 'final');
const tempPath = path.join(process.cwd(), 'public', 'images', 'temp');


cloudinary.config({
    cloud_name: 'drfjok8d7',
    api_key: '319771257136443',
    api_secret: 'aGlS8yvKAnYu1JBtT_hzLvFCunQ',
    keep_original: true
});

@Injectable()
export class CloundinaryService {
    async doUpload(file: string) {
        // const imgs: string[] = [];
        console.log('file name in upload', file)
        try {
            // const files = fs.readdirSync(finalPath);
            // console.log('files', files);
            // for (let file of files) {
            //     const img = await this.cloudUpload(path.join(finalPath, file), file);
            //     imgs.push(img.url);
            //     fs.unlinkSync(path.join(finalPath, file))
            //     fs.unlinkSync(path.join(tempPath, file))
            // }
            const img = await this.cloudUpload(path.join(finalPath, file), file);
            return img.url;
        } catch (error) {
            console.log('error in cloudinarySerivce', error);
        }
    }

    private cloudUpload(file: string, fileName: string) {
        return cloudinary.uploader.upload(file,
            { folder: 'node40_capstone_orm', public_id: fileName, upload_preset: 'owlzckut' })
    }
}
