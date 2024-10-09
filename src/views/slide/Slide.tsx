import { Background, SlideObjectType } from "../../storage/types"
import { SlideObject } from "../../components/slideObject/SlideObject"
import { CSSProperties } from "react"
import style from './Slide.module.css'

type SlideProps = {
    id: string,
    selectedObjectId: string | undefined,
    objects: Array<SlideObjectType>
    background: Background,
    isSelected: boolean,
    className: string,
    scale: number,
}

//Порешать превью. Сделать её слайдом. В каждый слайд и объект прокидывать scale
// Добавить в пропсы isSelected для изменения стилей
// И поле selection, чтобы устанавливать его через slide

// ширина и высота делается через `${SLIDE_HEIGHT/SLIDE_WIDTH * scale}px`
// Scale прокидывается и в объекты. С текстом могут быть проблемы
// передавать функции с параметрами в on-что-то () => func(param)
function Slide(props: SlideProps) {

    const slideStyle: CSSProperties = {}
    if (props.isSelected) slideStyle.border = 'solid 5px #6565FF'

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
        <div style={slideStyle} className={`${style.slide} ${props.className}`}>
            {
                props.objects.map(
                    object => <SlideObject
                        key={object.id}
                        object={object}
                        isSelected={object.id == props.selectedObjectId}
                        scale={props.scale} />
                )
            }
        </div>
    )
}

export { Slide }