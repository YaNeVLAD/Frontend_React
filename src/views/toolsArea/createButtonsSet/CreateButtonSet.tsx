import { addObject, deselectAllObjects } from "../../../storage/actions/objectActions"
import { Button } from "../../../components/button/Button"
import { dispatch } from "../../../storage/editor"
import Popover from "../../../components/popover/Popover"

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

            <Popover content={<><button onClick={() => dispatch(addObject, { type: 'imageObj' })}>AAA</button></>}>
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