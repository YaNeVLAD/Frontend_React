import EmptySlide from "../../../components/common/slideTypes/EmptySlide"
import Plus20Icon from "../../../components/common/icons/Plus20Icon"
import { addSlide } from "../../../storage/actions/slideActions"
import { Button } from "../../../components/button/Button"
import { SlidePreset } from "../../../storage/types"
import { dispatch } from "../../../storage/editor"

type PresentationButtonSetProps = {
    selectedSlidePreset: SlidePreset
}

const PresentationButtonSet = ({ selectedSlidePreset }: PresentationButtonSetProps) => {
    const popoverContent = (
        <>
            <div onClick={() => dispatch(addSlide, { type: 'title' })}>Слайд с заголовком</div>
            <div onClick={() => dispatch(addSlide, { type: 'image' })}>Слайд с картинкой</div>
            <div onClick={() => dispatch(addSlide, { type: 'title&image' })}>Слайд с заголовком и картинкой</div>
            <div onClick={() => dispatch(addSlide, { type: 'none' })}><EmptySlide /></div>
            <div onClick={() => dispatch(addSlide, { type: 'title&text' })}>Слайд с текстом</div>
        </>
    )

    return (
        <>
            <Button
                icon={Plus20Icon}
                onClick={() => dispatch(addSlide, { type: selectedSlidePreset, prev: true })}
                className=''
                popoverContent={popoverContent} />
        </>

    )
}

export { PresentationButtonSet }