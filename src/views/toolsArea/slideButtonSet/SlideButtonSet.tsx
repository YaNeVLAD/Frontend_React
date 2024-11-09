import { changeSlideBackgroundType } from "../../../storage/actions/slide/changeBackground"
import BackgroundPicker from "./slideBackgroundPicker/BackgroundPicker"
import { deleteSlide } from "../../../storage/actions/slide/delete"
import { BackgroundType, SlideType } from "../../../storage/types"
import { Button } from "../../../components/button/Button"
import Popup from "../../../components/popup/Popup"
import { dispatch } from "../../../storage/editor"

type SlideButtonSetProps = {
    slide: SlideType
}

function SlideButtonSet({ slide }: SlideButtonSetProps) {
    const onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value
        const background: BackgroundType = { value: value, type: 'solid' }
        dispatch(changeSlideBackgroundType, { background: background })
    }

    const onImageUpload = (image: string) => {
        const background: BackgroundType = { value: image, type: 'image' }
        dispatch(changeSlideBackgroundType, { background: background })
    }

    return (
        <>
            <Popup
                title="Фон"
                content={<BackgroundPicker
                    color={
                        slide.background.type == 'solid'
                            ? slide.background.value
                            : '#FFFFFF'}
                    onColorChange={onColorChange}
                    onImageUpload={onImageUpload} />}>
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