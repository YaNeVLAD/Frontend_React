import { GradientColor, ImageSrc, SolidColor } from '../../Model/types'
import style from './SlidePreview.module.css'

type SlidePreviewProps = {
    id: string,
    background: ImageSrc | SolidColor | GradientColor
}

function SlidePreview(slidePreviewProps: SlidePreviewProps) {
    let slidePreviewStyle
    switch (slidePreviewProps.background.type) {
        case 'solid':
            {
                slidePreviewStyle = {
                    backgroundColor: slidePreviewProps.background.value
                }
                break
            }
        case 'image':
            {
                slidePreviewStyle = {
                    backgroundImage: 'url(\'' + slidePreviewProps.background.value + '\')'
                }
                break
            }
        case 'gradient':
            {
                slidePreviewStyle = {
                    backgroundImage: 'linear-gradient(to left, ' + slidePreviewProps.background.value.firstColor + ', ' + slidePreviewProps.background.value.secondColor + ')'
                }
                break
            }
    }

    return (
        <div className={style.slide_preview} style={slidePreviewStyle}>
        </div>
    )
}

export { SlidePreview }