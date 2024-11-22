import { PresentationType } from "../storage/types"
import { TITLE_SLIDE } from "./Slides/TitleSlide"

function BASE_PRESENTATION(): PresentationType {
    return {
        title: "Новая презентация",
        slides: [TITLE_SLIDE()]
    }
}

export { BASE_PRESENTATION }