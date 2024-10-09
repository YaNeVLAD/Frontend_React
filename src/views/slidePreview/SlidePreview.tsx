import { selectSlide } from '../../storage/functions'
import { dispatch } from '../../storage/presentation'
import { GradientColor, ImageSrc, SolidColor } from '../../storage/types'
import style from './SlidePreview.module.css'

type SlidePreviewProps = {
    id: string,
    background: ImageSrc | SolidColor | GradientColor
}

function SlidePreview(slidePreviewProps: SlidePreviewProps) {
    function onClick() { dispatch(selectSlide, { id: slidePreviewProps.id }) }

    const slidePreviewStyle = {
        backgroundColor: '',
        backgroundImage: '',
    }

    switch (slidePreviewProps.background.type) {
        case 'solid':
            {
                slidePreviewStyle.backgroundColor = slidePreviewProps.background.value
                break
            }
        case 'image':
            {
                slidePreviewStyle.backgroundImage = 'url(\'' + slidePreviewProps.background.value + '\')'
                break
            }
        case 'gradient':
            {
                slidePreviewStyle.backgroundImage = 'linear-gradient(to left, ' + slidePreviewProps.background.value[0] + ', ' + slidePreviewProps.background.value[1] + ')'
                break
            }
    }

    return (
        <div
            className={style.slide_preview}
            style={slidePreviewStyle}
            onClick={onClick}>
        </div>
    )
}

export { SlidePreview }