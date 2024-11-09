import { changeSlideBackgroundType } from "../../../storage/actions/slide/changeBackground"
import { deleteSlide } from "../../../storage/actions/slide/delete"
import { BackgroundType, SlideType } from "../../../storage/types"
import { Button } from "../../../components/button/Button"
import { dispatch } from "../../../storage/editor"
import Popover from "../../../components/popover/Popover"

type SlideButtonSetProps = {
    slide: SlideType
}

function SlideButtonSet({ slide }: SlideButtonSetProps) {
    const onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value
        const background: BackgroundType = { value: value, type: 'solid' }
        dispatch(changeSlideBackgroundType, { background: background })
    }

    return (
        <>
            <Popover content={<><input
                type='color'
                value={slide.background.value}
                onChange={onColorChange} /></>}>
                <Button
                    type='text'
                    value='Фон'
                    onClick={() => { }}
                    className='' />
            </Popover>

            <Button
                type='text'
                value='Удалить слайд'
                onClick={() => dispatch(deleteSlide)}
                className='' />
        </>
    )
}

export { SlideButtonSet }