export interface ISavedImage {
    img_id: number,
    img_url: string,
}

interface Image {
    img: {
        img_url: string,
        img_id: number
    }
}

export const convert = (images: Image[]) => {
    return images.map((image) => ({
        img_id: image.img.img_id,
        img_url: image.img.img_url,
    }))
}