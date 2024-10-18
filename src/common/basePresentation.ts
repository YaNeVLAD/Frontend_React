import { deepCopy } from "../storage/deepCopy"
import { EMPTY_SLIDE } from "./slides/emptySlide"

const BASE_PRESENTATION = deepCopy({
    title: "Моя презентация, которая будет служить мне верой и правдой!",
    slides: [EMPTY_SLIDE],
})

export { BASE_PRESENTATION }