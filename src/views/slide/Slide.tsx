import { Background, ImageType, TextAreaType } from "../../storage/types"
import { SlideObject } from "../../components/slideObject/SlideObject"
import style from './Slide.module.css'
import { CSSProperties } from "react"

type SlideProps = {
    id: string,
    selectedObjectId: string | undefined,
    objects: Array<TextAreaType | ImageType>
    background: Background,
}

//Порешать превью. Сделать её слайдом. В каждый слайд и объект прокидывать scale
// Добавить в пропсы isSelected для изменения стилей
// И поле selection, чтобы устанавливать его через slide

// ширина и высота делается через `${SLIDE_HEIGHT/SLIDE_WIDTH * scale}px`
// Scale прокидывается и в объекты. С текстом могут быть проблемы
// передавать функции с параметрами в on-что-то () => func(param)
function Slide(props: SlideProps) {

    const slideStyle: CSSProperties = {}

    switch (props.background.type) {
        case 'solid':
            {
                slideStyle.backgroundColor = props.background.value
                break
            }
        case 'image':
            {
                slideStyle.backgroundImage = 'url(\'' + props.background.value + '\')'
                break
            }
        case 'gradient':
            {
                slideStyle.backgroundImage = 'linear-gradient(to left, ' + props.background.value[0] + ', ' + props.background.value[1] + ')'
                break
            }
    }

    return (
        <div style={slideStyle} className={style.slide}>
            {
                props.objects.map(
                    object => <SlideObject
                        key={object.id}
                        object={object}
                        isSelected={object.id == props.selectedObjectId} />
                )
            }
        </div>
    )
}

export { Slide }