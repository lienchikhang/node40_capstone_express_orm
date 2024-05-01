import { IsNotEmpty, IsNumber, IsString, isNotEmpty } from "class-validator";

export class ImageDto {
    @IsNotEmpty()
    title: string

    @IsString()
    desc: string
}

export interface IdefaultFilter {
    img_id: {},
    img_name?: {},
    save?: {}
}

export class CommentDto {
    @IsNotEmpty()
    @IsString()
    content: string
}

export class QImgDto {
    // @IsNotEmpty()
    qImg: number
}


