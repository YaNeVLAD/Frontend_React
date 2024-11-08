import { changeSlideBackgroundType } from "../../../storage/actions/slide/changeBackground"
import { deleteSlide } from "../../../storage/actions/slide/delete"
import { BackgroundType, SlideType } from "../../../storage/types"
import { Button } from "../../../components/button/Button"
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

    return (
        <>
            <Button
                type='icon'
                value='bucket'
                onClick={() => { }}
                className=''
                dropdownContent={[
                    <input
                        type='color'
                        value={slide.background.value}
                        onChange={onColorChange} />
                ]} />

            <Button
                type='icon'
                value='trashCan'
                onClick={() => dispatch(deleteSlide)}
                className='' />
        </>
    )
}

export { SlideButtonSet }