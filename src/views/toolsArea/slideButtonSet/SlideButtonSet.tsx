import { changeSlideBackgroundType } from "../../../storage/actions/slide/changeBackground"
import { deleteSlide } from "../../../storage/actions/slide/delete"
import { BackgroundType, SlideType } from "../../../storage/types"
import { Button } from "../../../components/button/Button"
import { dispatch } from "../../../storage/editor"
import Popup from "../../../components/popup/Popup"
import ColorPicker from "./colorPicker/ColorPicker"

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
            <Popup
                title="Фон"
                content={<ColorPicker
                    color={
                        slide.background.type == 'solid'
                            ? slide.background.value
                            : ''}
                    onColorChange={onColorChange} />}>
                <Button
                    type='text'
                    value='Фон'
                    onClick={() => { }}
                    className='' />
            </Popup>

            <Button
                type='text'
                value='Удалить слайд'
                onClick={() => dispatch(deleteSlide)}
                className='' />
        </>
    )
}

export { SlideButtonSet }