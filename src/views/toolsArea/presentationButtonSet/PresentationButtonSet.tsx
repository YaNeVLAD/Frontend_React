import { Button } from "../../../components/button/Button"
import { addSlide } from "../../../storage/actions/slide/add"
import { dispatch } from "../../../storage/editor"

function PresentationButtonSet() {
    return (
        <Button
            type='icon'
            value={'plus'}
            onClick={() => dispatch(addSlide, { type: 'none' })}
            className=''
            dropdownContent={[
                <span onClick={() => dispatch(addSlide, { type: 'title' })}>Cлайд c заголовком</span>,
                <span onClick={() => dispatch(addSlide, { type: 'image' })}>Слайд с картинкой</span>,
                <span onClick={() => dispatch(addSlide, { type: 'title&image' })}>Слайд с заголовком и картинкой</span>,
                <span onClick={() => dispatch(addSlide, { type: 'none' })}>Пустой слайд</span>,
            ]} />
    )
}

export { PresentationButtonSet }