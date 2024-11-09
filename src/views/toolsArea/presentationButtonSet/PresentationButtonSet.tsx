import { Button } from "../../../components/button/Button"
import EmptySlide from "../../common/slidePreviews/EmptySlide"
import { addSlide } from "../../../storage/actions/slide/add"
import { dispatch } from "../../../storage/editor"
import Plus20Icon from "../../../components/common/icons/Plus20Icon"

function PresentationButtonSet() {
    const popoverContent = (
        <>
            <div onClick={() => dispatch(addSlide, { type: 'title' })}>Слайд с заголовком</div>
            <div onClick={() => dispatch(addSlide, { type: 'image' })}>Слайд с картинкой</div>
            <div onClick={() => dispatch(addSlide, { type: 'title&image' })}>Слайд с заголовком и картинкой</div>
            <div onClick={() => dispatch(addSlide, { type: 'none' })}><EmptySlide /></div>
        </>
    )

    return (
        <>
            <Button
                icon={Plus20Icon}
                text=""
                onClick={() => dispatch(addSlide, { type: 'none' })}
                className=''
                popoverContent={popoverContent} />
        </>

    )
}

export { PresentationButtonSet }