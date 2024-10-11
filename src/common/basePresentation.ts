import { deepCopy } from "../storage/deepCopy"
import { EMPTY_SLIDE } from "./emptySlide"

const BASE_PRESENTATION = deepCopy({
    title: "My Presentation",
    slides: [EMPTY_SLIDE],
})

export { BASE_PRESENTATION }