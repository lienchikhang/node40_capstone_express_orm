import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseService } from 'src/response/response.service';
import { CommentDto, IdefaultFilter } from './dto';
import { equal } from 'assert';

@Injectable()
export class ImageService {
    constructor(
        private response: ResponseService,
        private prisma: PrismaService,
    ) { }

    async getImages(qRecord: number = 0, qName: string) {
        try {
            console.log('service:: ', { qRecord, qName })
            let defaultFilter: IdefaultFilter = {
                img_id: {
                    gt: qRecord,
                }
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
                take: 25,
            })

            if (!images.length) return this.response.create(200, 'Get successfully!', { data: images });

            return this.response.create(200, 'Get successfully!', { data: images, lastRcd: images[images.length - 1].img_id });

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
            const newComment = await this.prisma.comment.create({
                data: {
                    user_id: userId,
                    img_id: qImg,
                    content: body.content,
                    date: new Date(),
                }
            })

            delete newComment.user_id;

            return this.response.create(201, 'Add successfully', newComment);
        } catch (error) {
            console.log('error:: ', error);
            if (error.status === 500) throw new InternalServerErrorException(this.response.create(500, 'Internal Server Error'));
        }
    }

    async getImagesByUserId(userId: number, qRecord: number = 0) {
        try {
            const images = await this.prisma.image.findMany({
                select: {
                    img_id: true,
                    img_url: true,
                },
                where: {
                    user_id: userId,
                    img_id: {
                        gt: qRecord
                    }
                },
                take: 25,
            })

            if (!images.length) return this.response.create(200, 'Get successfully!', { data: images })

            return this.response.create(200, 'Get successfully!', { data: images, lastRcd: images[images.length - 1].img_id })
        } catch (error) {
            console.log('error:: ', error);
            if (error.status === 500) throw new InternalServerErrorException(this.response.create(500, 'Internal Server Error'));
        }
    }

    async getSaveImagesByUserId(userId: number, qRecord: number = 0) {
        try {
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
                    img: {
                        img_id: {
                            gt: qRecord
                        }
                    }
                },
                take: 15,
            })

            if (!saveImages.length) return this.response.create(200, 'Get successfully', { data: saveImages })

            return this.response.create(200, 'Get successfully', { data: saveImages, lastRcd: saveImages[saveImages.length - 1].img.img_id })
        } catch (error) {
            console.log('error:: ', error);
            if (error.status === 500) throw new InternalServerErrorException(this.response.create(500, 'Internal Server Error'));
        }
    }
}
