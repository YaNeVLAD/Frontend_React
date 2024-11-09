import { Button } from "../../../components/button/Button"
import EmptySlide from "../../common/slidePreviews/EmptySlide"
import { addSlide } from "../../../storage/actions/slide/add"
import { dispatch } from "../../../storage/editor"
import Popover from "../../../components/popover/Popover"

function PresentationButtonSet() {
    return (
        <Popover content={<><div onClick={() => dispatch(addSlide, { type: 'title' })}>Cлайд c заголовком</div>,
            <div onClick={() => dispatch(addSlide, { type: 'image' })}>Слайд с картинкой</div>,
            <div onClick={() => dispatch(addSlide, { type: 'title&image' })}>Слайд с заголовком и картинкой</div>,
            <div onClick={() => dispatch(addSlide, { type: 'none' })}><EmptySlide /></div></>}>
            <Button
                type='icon'
                value={'plus'}
                onClick={() => dispatch(addSlide, { type: 'none' })}
                className='' />
        </Popover>
    )
}

export { PresentationButtonSet }