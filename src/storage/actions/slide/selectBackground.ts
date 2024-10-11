import { CSSProperties } from "react"
import { BackgroundType } from "../../types"

function selectSlideBackgroundType(style: CSSProperties, background: BackgroundType): CSSProperties {
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

export { selectSlideBackgroundType }