import { deepCopy } from "../storage/utils/deepCopy"
import { uuid } from "../storage/utils/functions"
import { EMPTY_SLIDE } from "./slides/emptySlide"

const BASE_PRESENTATION = deepCopy({
    title: "Моя презентация, которая будет служить мне верой и правдой!",
    slides: [{ ...EMPTY_SLIDE, id: uuid() }],
})

export { BASE_PRESENTATION }