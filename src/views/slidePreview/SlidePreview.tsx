import { GradientColor, ImageSrc, SolidColor } from '../../storage/types'
import style from './SlidePreview.module.css'

type SlidePreviewProps = {
    id: string,
    background: ImageSrc | SolidColor | GradientColor
}
//Порешать превью. Сделать её слайдом. В каждый слайд и объект прокидывать scale
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
                    backgroundImage: 'linear-gradient(to left, ' + slidePreviewProps.background.values[0] + ', ' + slidePreviewProps.background.values[1] + ')'
                }
                break
            }
    }

    return (
        <div
            className={style.slide_preview}
            style={slidePreviewStyle}>
        </div>
    )
}

export { SlidePreview }