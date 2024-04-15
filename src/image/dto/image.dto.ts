import { IsNotEmpty, IsNumber, IsString, isNotEmpty } from "class-validator";

export class ImageDto {

}

export interface IdefaultFilter {
    img_id: {},
    img_name?: {},
}

export class CommentDto {
    @IsNotEmpty()
    @IsString()
    content: string
}

export class QImgDto {
    @IsNotEmpty()
    @IsNumber()
    qImg: number
}


