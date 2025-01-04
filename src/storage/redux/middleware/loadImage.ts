import { addImage } from "../actions/actionCreators"
import { uuid } from "../../utils/uuid"
import { Dispatch } from "redux"
import { ImageType } from "../../types"

export const loadImage = (slideId: string, imageUrl: string) => {
    return async (dispatch: Dispatch) => {
        const image = new Image()
        image.src = imageUrl

        await new Promise<void>((resolve, reject) => {
            image.onload = () => resolve()
            image.onerror = () => reject(new Error('Image failed to load'))
        })

        const aspectRatio = image.width / image.height
        const slideMaxWidth = 913
        const slideMaxHeight = 513

        const width =
            image.width > slideMaxWidth || image.height > slideMaxHeight
                ? aspectRatio > 1
                    ? slideMaxWidth
                    : slideMaxHeight * aspectRatio
                : image.width

        const height =
            image.width > slideMaxWidth || image.height > slideMaxHeight
                ? aspectRatio > 1
                    ? slideMaxWidth / aspectRatio
                    : slideMaxHeight
                : image.height

        const imageObject: ImageType = {
            id: uuid(),
            type: 'imageObj',
            src: { type: 'image', value: imageUrl },
            size: { width, height },
            pos: { x: 0, y: 0 },
            turnAngle: 0
        }

        dispatch(addImage(slideId, imageObject))
    }
}