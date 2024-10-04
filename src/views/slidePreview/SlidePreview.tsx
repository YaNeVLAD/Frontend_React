import { selectSlide } from '../../storage/functions'
import { dispatch } from '../../storage/presentation'
import { GradientColor, ImageSrc, SolidColor } from '../../storage/types'
import style from './SlidePreview.module.css'

type SlidePreviewProps = {
    id: string,
    selectedSlideId: string,
    background: ImageSrc | SolidColor | GradientColor
}

function SlidePreview(slidePreviewProps: SlidePreviewProps) {
    function onClick() {
        dispatch(selectSlide, { id: slidePreviewProps.id })
    }

    const slidePreviewStyle = {
        backgroundColor: '',
        backgroundImage: '',
        borderColor: '',
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
                slidePreviewStyle.backgroundImage = 'linear-gradient(to left, ' + slidePreviewProps.background.values[0] + ', ' + slidePreviewProps.background.values[1] + ')'
                break
            }
    }

    if (slidePreviewProps.id == slidePreviewProps.selectedSlideId) {
        slidePreviewStyle.borderColor = '#6565FF'
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