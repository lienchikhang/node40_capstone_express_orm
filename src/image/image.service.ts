import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseService } from 'src/response/response.service';
import { CommentDto, IdefaultFilter, ImageDto } from './dto';
import { equal } from 'assert';
import { CompressImageService } from 'src/compress-image/compress-image.service';
import { CloundinaryService } from 'src/cloundinary/cloundinary.service';
import { convert } from 'src/lib/convertSaveImage';

@Injectable()
export class ImageService {
    constructor(
        private response: ResponseService,
        private prisma: PrismaService,
        private compressImage: CompressImageService,
        private cloudinary: CloundinaryService,
    ) { }

    async getImages(page: number = 1, qName: string, userId: number) {
        try {
            console.log('service:: ', { page, qName, userId })

            //tìm những ảnh user đã luư
            const savedImgs = await this.prisma.save.findMany({
                select: {
                    img_id: true,
                },
                where: {
                    user_id: userId,
                }
            })

            let saveImgs: number[] = savedImgs.map((img) => img.img_id);

            // lọc những ảnh user chưa lưu và hiển thị
            let defaultFilter: IdefaultFilter = {
                img_id: {
                    notIn: saveImgs,
                },
            }

            if (qName) {
                defaultFilter = {
                    ...defaultFilter,
                    img_name: {
                        contains: qName,
                    }
                }
            }

            const images = await this.prisma.image.findMany({
                select: {
                    img_url: true,
                    img_id: true,
                },
                where: defaultFilter,
                take: 10,
                skip: (page - 1) * 10
            })

            const total = await this.prisma.image.count({
                where: defaultFilter
            })


            if (!images.length) return this.response.create(200, 'Get successfully!', { data: images, totalPage: 0 });

            return this.response.create(200, 'Get successfully!', { data: images, totalPage: Math.ceil((total / 10)) });

        } catch (error) {
            if (error.status === 500) throw new InternalServerErrorException(this.response.create(500, 'Internal Server Error'));
        }
    }

    async getImageById(pid: number, qCmt: number = 0, userId: number) {
        try {
            console.log({ pid, qCmt })
            const image = await this.prisma.image.findUnique({
                select: {
                    img_url: true,
                    img_name: true,
                    img_desc: true,
                    user: {
                        select: {
                            user_id: true,
                            full_name: true,
                            avatar: true,
                        },
                    },
                    comment: {
                        select: {
                            cmt_id: true,
                            date: true,
                            content: true,
                            user: {
                                select: {
                                    avatar: true,
                                    full_name: true,
                                }
                            }
                        },
                        where: {
                            cmt_id: {
                                gt: qCmt
                            }
                        },
                        take: 5,
                    }
                },
                where: {
                    img_id: pid,
                }
            })

            let isSaved = false;
            const save = await this.prisma.save.findFirst({
                where: {
                    user_id: userId,
                    img_id: pid,
                }
            })

            if (save) isSaved = true;

            if (!image.comment.length) return this.response.create(200, 'Get successfully', { data: image, isSaved });

            return this.response.create(200, 'Get successfully', { data: image, isSaved, lastCmt: image.comment[image.comment.length - 1].cmt_id });
        } catch (error) {
            if (error.status === 500) throw new InternalServerErrorException(this.response.create(500, 'Internal Server Error'));
        }
    }

    async addComment(qImg: number, body: CommentDto, userId: number) {
        try {

            console.log({ qImg, body, userId })

            const newComment = await this.prisma.comment.create({
                data: {
                    user_id: userId,
                    img_id: qImg,
                    content: body.content,
                    date: new Date(),
                }
            })

            const user = await this.prisma.user.findUnique({
                select: {
                    full_name: true,
                    avatar: true,
                },
                where: {
                    user_id: newComment.user_id,
                }
            })

            delete newComment.user_id;


            return this.response.create(201, 'Add successfully', { comment: { ...newComment, user } });
        } catch (error) {
            console.log('error:: ', error);
            if (error.status === 500) throw new InternalServerErrorException(this.response.create(500, 'Internal Server Error'));
        }
    }

    async getImagesByUserId(userId: number, page: number = 1) {
        try {
            const images = await this.prisma.image.findMany({
                select: {
                    img_id: true,
                    img_url: true,
                },
                where: {
                    user_id: userId,
                },
                take: 10,
                skip: (page - 1) * 10,
            })

            const total = await this.prisma.image.count({
                where: {
                    user_id: userId,
                },
            })


            if (!images.length) return this.response.create(200, 'Get successfully!', { data: images })

            return this.response.create(200, 'Get successfully!', { data: images, totalPage: Math.ceil((total / 10)) })
        } catch (error) {
            console.log('error:: ', error);
            if (error.status === 500) throw new InternalServerErrorException(this.response.create(500, 'Internal Server Error'));
        }
    }

    async getSaveImagesByUserId(userId: number, page: number = 1) {
        try {
            console.log({ userId, page })
            const saveImages = await this.prisma.save.findMany({
                select: {
                    img: {
                        select: {
                            img_id: true,
                            img_url: true,
                        }
                    }
                },
                where: {
                    user_id: userId,
                },
                take: 6,
                skip: (page - 1) * 6,
            })

            const total = await this.prisma.save.count({
                where: { user_id: userId, }
            })

            const convertedImages = convert(saveImages)

            if (!saveImages.length) return this.response.create(200, 'Get successfully', { data: convertedImages, totalPage: 0 })

            return this.response.create(200, 'Get successfully', { data: convertedImages, totalPage: Math.ceil((total / 6)) })
        } catch (error) {
            console.log('error:: ', error);
            if (error.status === 500) throw new InternalServerErrorException(this.response.create(500, 'Internal Server Error'));
        }
    }

    async deleteImageById(userId: number, imgId: number) {
        try {

            //check image exist
            const isExistImg = await this.prisma.image.findUnique({
                where: {
                    img_id: imgId,
                }
            })

            if (!isExistImg) throw new NotFoundException(this.response.create(404, 'Image not found'));

            //delete image
            const deleted = await this.prisma.image.delete({
                where: {
                    user_id: userId,
                    img_id: imgId,
                }
            })

            return this.response.create(200, 'Delete successfully!', deleted);

        } catch (error) {
            console.log('error:: ', error);
            if (error.status === 500) throw new InternalServerErrorException(this.response.create(500, 'Internal Server Error'));
        }
    }

    async createImage(userId: number, data: ImageDto) {
        console.log('data send create', data)
        try {
            const newImg = await this.prisma.image.create({
                data: {
                    user_id: userId,
                    img_name: data.title,
                    img_desc: data.desc,
                }
            })

            delete newImg.user_id;

            return this.response.create(201, 'Create successfully!', newImg);

        } catch (error) {
            console.log('error:: ', error);
            if (error.status === 500) throw new InternalServerErrorException(this.response.create(500, 'Internal Server Error'));
        }
    }

    async uploadImage(file: Express.Multer.File, userId: number, imgId: number) {
        try {
            console.log({ file, userId, imgId });
            // const isExistImg = await this.prisma.image.findUnique({
            //     where: {
            //         img_id: imgId,
            //     }
            // })

            // if (isExistImg) throw new ConflictException(this.response.create(429, 'Image has already existed'));

            await this.compressImage.compress(file.filename);
            const imgs = await this.cloudinary.doUpload();

            const uploadImage = await this.prisma.image.update({
                data: {
                    img_url: imgs[0]
                },
                where: {
                    user_id: userId,
                    img_id: imgId,
                }
            })

            delete uploadImage.user_id;

            return this.response.create(201, 'Upload successfully!', uploadImage);
        } catch (error) {
            console.log('error:: ', error);
            if (error.status === 500) throw new InternalServerErrorException(this.response.create(500, 'Internal Server Error'));
        }
    }

    async saveImage(userId: number, imgId: number) {
        try {

            //check image exist
            const isExistImg = await this.prisma.image.findUnique({
                where: {
                    img_id: imgId,
                }
            })

            if (!isExistImg) throw new NotFoundException(this.response.create(404, 'Image not found'));

            //save image
            await this.prisma.save.create({
                data: {
                    user_id: userId,
                    img_id: imgId,
                    date: new Date(),
                }
            })

            return this.response.create(201, 'Save successfully!');
        } catch (error) {
            console.log('error:: ', error);
            if (error.status === 500) throw new InternalServerErrorException(this.response.create(500, 'Internal Server Error'));
        }
    }
}
