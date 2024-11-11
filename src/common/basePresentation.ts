import { deepCopy } from "../storage/utils/deepCopy"
import { uuid } from "../storage/utils/functions"
import { TITLE_SLIDE } from "./slides/titleSlide"

const BASE_PRESENTATION = deepCopy({
    title: "Новая презентация",
    slides: [{ ...TITLE_SLIDE, id: uuid() }]
})

export { BASE_PRESENTATION }