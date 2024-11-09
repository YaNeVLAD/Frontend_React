import { addObject, deselectAllObjects } from "../../../storage/actions/objectActions"
import { Button } from "../../../components/button/Button"
import { dispatch } from "../../../storage/editor"
import Popover from "../../../components/popover/Popover"
import ImageInput from "../../../components/ImageInput/ImageInput"

function CreateButtonSet() {
    const onImageUpload = (image: string) => {
        dispatch(addObject, { type: 'imageObj', value: image })
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
                onClick={() => dispatch(addObject, { type: 'textObj', value: '' })}
                className='' />

            <Popover content={<><label>Загрузить<ImageInput onImageUpload={onImageUpload} /></label></>}>
                <Button
                    type='icon'
                    value='image'
                    onClick={() => { }}
                    className='' />
            </Popover>
        </>
    )
}

export { CreateButtonSet }