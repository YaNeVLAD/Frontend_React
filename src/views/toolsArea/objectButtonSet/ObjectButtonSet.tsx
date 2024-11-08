import { Button } from "../../../components/button/Button"
import { SlideObjectType } from "../../../storage/types"
import { dispatch } from "../../../storage/editor"
import { deleteObject } from "../../../storage/actions/objectActions"

type ObjectButtonSetProps = {
    object: SlideObjectType | undefined
}

function ObjectButtonSet({ object }: ObjectButtonSetProps) {
    return (
        object
            ?
            <div>
                <Button
                    type='icon'
                    value='trashCan'
                    onClick={() => dispatch(deleteObject)}
                    className='' />
            </div>
            :
            <></>
    )
}

export { ObjectButtonSet }
