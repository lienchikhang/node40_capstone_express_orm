import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseService } from 'src/response/response.service';
import { UserDto } from './dto';
import { hashSync } from 'bcrypt';
import { CompressImageService } from 'src/compress-image/compress-image.service';
import { CloundinaryService } from 'src/cloundinary/cloundinary.service';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private response: ResponseService,
        private compressImage: CompressImageService,
        private cloudinary: CloundinaryService,
    ) { }

    async getInfo(userId: number) {
        try {
            const user = await this.prisma.user.findUnique({
                select: {
                    age: true,
                    avatar: true,
                    full_name: true,
                    email: true,
                },
                where: {
                    user_id: userId,
                }
            })

            return this.response.create(200, 'Get successfully!', user);

        } catch (error) {
            console.log('error:: ', error);
            if (error.status === 500) throw new InternalServerErrorException(this.response.create(500, 'Internal Server Error'));
        }
    }

    async adjustInfo(userId: number, data: UserDto) {
        try {

            if (data.password) {
                data.password = hashSync(data.password, 7);
            }

            const newInfo = await this.prisma.user.update({
                data,
                where: {
                    user_id: userId,
                }
            })

            delete newInfo.password;
            delete newInfo.refresh_token;
            delete newInfo.user_id;

            return this.response.create(200, 'Adjust successfully!', newInfo);

        } catch (error) {
            console.log('error:: ', error);
            if (error.status === 500) throw new InternalServerErrorException(this.response.create(500, 'Internal Server Error'));
        }
    }

    async adjustAvatarInfo(userId: number, file: Express.Multer.File) {
        try {

            await this.compressImage.compress(file.filename);
            const image = await this.cloudinary.doUpload(file.filename);

            const newInfo = await this.prisma.user.update({
                data: {
                    avatar: image[0]
                },
                where: {
                    user_id: userId,
                }
            })

            delete newInfo.password;
            delete newInfo.refresh_token;
            delete newInfo.user_id;

            return this.response.create(200, 'Adjust successfully!', newInfo);

        } catch (error) {
            console.log('error:: ', error);
            if (error.status === 500) throw new InternalServerErrorException(this.response.create(500, 'Internal Server Error'));
        }
    }
}
