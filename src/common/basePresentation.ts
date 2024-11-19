import { PresentationType } from "../storage/types"
import { deepCopy } from "../storage/utils/deepCopy"
import { TitleSlide } from "./Slides/TitleSlide"

const BASE_PRESENTATION = deepCopy({
    title: "Новая презентация",
    slides: [TitleSlide()]
})

const BasePresentation = (): PresentationType => deepCopy(BASE_PRESENTATION)

export { BasePresentation }