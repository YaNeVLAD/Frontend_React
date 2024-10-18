import { changeSlideBackgroundType } from "../../../storage/actions/slide/changeBackground"
import { deselectAllObjects } from "../../../storage/actions/object/deselectAll"
import { BackgroundType, SlideType } from "../../../storage/types"
import { addObject } from "../../../storage/actions/object/add"
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
                value='cursor'
                onClick={() => dispatch(deselectAllObjects)}
                className='' />

            <Button
                type='icon'
                value='text'
                onClick={() => dispatch(addObject, { type: 'textObj' })}
                className='' />

            <Button
                type='icon'
                value='image'
                onClick={() => dispatch(addObject, { type: 'imageObj' })}
                className='' />

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
        </>
    )
}

export { SlideButtonSet }