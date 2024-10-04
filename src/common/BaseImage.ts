import { uuid } from "../storage/functions"
import { ImageType } from "../storage/types"

const BASE_IMAGE: ImageType = {
    id: uuid(),
    type: 'imageObj',
    pos: { x: 50, y: 50 },
    size: { width: 200, height: 200 },
    turnAngle: 0,
    src: { value: '/aboba.png', type: 'image' },
}

export { BASE_IMAGE }