import { PresentationType } from "../storage/types"
import { uuid } from "../storage/utils/functions"
import { TITLE_SLIDE } from "./Slides/TitleSlide"

function BASE_PRESENTATION(): PresentationType {
    return {
        id: uuid(),
        author: "me",
        title: "Новая презентация",
        slides: [TITLE_SLIDE()]
    }
}

export { BASE_PRESENTATION }