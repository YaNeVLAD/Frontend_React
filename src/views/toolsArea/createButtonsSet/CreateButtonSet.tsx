import { addObject, deselectAllObjects } from "../../../storage/actions/objectActions"
import { Button } from "../../../components/button/Button"
import { dispatch } from "../../../storage/editor"

function CreateButtonSet() {
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
        </>
    )
}

export { CreateButtonSet }