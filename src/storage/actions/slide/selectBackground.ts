import { CSSProperties } from "react"
import { Background } from "../../types"


function selectSlideBackground(style: CSSProperties, background: Background): CSSProperties {
    switch (background.type) {
        case 'solid':
            {
                style.backgroundColor = background.value
                break
            }
        case 'image':
            {
                style.backgroundImage = `url('${background.value}')`
                break
            }
        case 'gradient':
            {
                style.backgroundImage = `linear-gradient(to left, '${background.value[0]}', '${background.value[1]}')`
                break
            }
    }

    return style
}

export { selectSlideBackground }