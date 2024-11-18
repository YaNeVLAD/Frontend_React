import { useGetSelectedSlide } from "../../../hooks/useGetSelectedSlide"
import BackgroundPicker from "./slideBackgroundPicker/BackgroundPicker"
import { Button } from "../../../components/button/Button"
import { useAppActions } from "../../../hooks/useRedux"
import { BackgroundType } from "../../../storage/types"
import Popup from "../../../components/popup/Popup"

const SlideButtonSet = () => {
    const selectedSlide = useGetSelectedSlide()
    const { changeSlideBackground, deleteSlide } = useAppActions()
    if (selectedSlide == undefined) return (<></>)

    const onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value
        const background: BackgroundType = { value: value, type: 'solid' }
        changeSlideBackground(selectedSlide.id, background)
    }

    const onImageUpload = (image: string) => {
        const background: BackgroundType = { value: image, type: 'image' }
        changeSlideBackground(selectedSlide.id, background)
    }

    return (
        <>
            <Popup
                title="Фон"
                content={<BackgroundPicker
                    color={
                        selectedSlide.background.type == 'solid'
                            ? selectedSlide.background.value
                            : '#FEFEFE'}
                    onColorChange={onColorChange}
                    onImageUpload={onImageUpload} />}>
                <Button
                    type="text"
                    displayType="tools-area"
                    onClick={() => { }}>
                    {'Фон'}
                </Button>
            </Popup>
            <Button

                type="text"
                displayType="tools-area"
                onClick={() => deleteSlide(selectedSlide.id)}>
                {'Удалить слайд'}
            </Button>
        </>
    )
}

export { SlideButtonSet }