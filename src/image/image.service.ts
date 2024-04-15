import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseService } from 'src/response/response.service';
import { IdefaultFilter } from './dto';
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

            return this.response.create(200, 'Get successfully', { data: image, isSaved, lastCmt: image.comment[image.comment.length - 1].cmt_id });
        } catch (error) {
            if (error.status === 500) throw new InternalServerErrorException(this.response.create(500, 'Internal Server Error'));
        }
    }

}
