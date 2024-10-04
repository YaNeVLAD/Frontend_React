import { SlideType } from "../../storage/types"
import { Slide } from "../../components/slide/Slide"
import style from './CurrentSlide.module.css'

type CurrentSlideProps = SlideType & {
    selectedObjectId: string | undefined
}
//Лишняя вложенность. Удалить компонент
function CurrentSlide(selectedSlideProps: CurrentSlideProps) {
    return (
        <div className={style.selectedSlide}>
            <Slide
                id={selectedSlideProps.id}
                selectedObjectId={selectedSlideProps.selectedObjectId}
                objects={selectedSlideProps.objects}
                background={selectedSlideProps.background} />
        </div>
    )
}

export { CurrentSlide }