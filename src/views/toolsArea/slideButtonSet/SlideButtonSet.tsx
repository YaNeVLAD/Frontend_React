import { changeSlideBackground, deleteSlide } from "../../../storage/actions/slideActions"
import BackgroundPicker from "./slideBackgroundPicker/BackgroundPicker"
import { BackgroundType, SlideType } from "../../../storage/types"
import { Button } from "../../../components/button/Button"
import Popup from "../../../components/popup/Popup"
import { dispatch } from "../../../storage/editor"

type SlideButtonSetProps = {
    slide: SlideType
}

const SlideButtonSet = ({ slide }: SlideButtonSetProps) => {
    const onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value
        const background: BackgroundType = { value: value, type: 'solid' }
        dispatch(changeSlideBackground, { background: background })
    }

    const onImageUpload = (image: string) => {
        const background: BackgroundType = { value: image, type: 'image' }
        dispatch(changeSlideBackground, { background: background })
    }

    return (
        <>
            <Popup
                title="Фон"
                content={<BackgroundPicker
                    color={
                        slide.background.type == 'solid'
                            ? slide.background.value
                            : '#FEFEFE'}
                    onColorChange={onColorChange}
                    onImageUpload={onImageUpload} />}>
                <Button
                    type="text"
                    onClick={() => { }}>
                    {'Фон'}
                </Button>
            </Popup>

            <Button
                type="text"
                onClick={() => dispatch(deleteSlide)}>
                {'Удалить слайд'}
            </Button>
        </>
    )
}

export { SlideButtonSet }