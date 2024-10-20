import { deleteObject } from "../../../storage/actions/object/delete"
import { Button } from "../../../components/button/Button"
import { SlideObjectType } from "../../../storage/types"
import { dispatch } from "../../../storage/editor"

type ObjectButtonSetProps = {
    object: SlideObjectType | undefined
}

function ObjectButtonSet({ object }: ObjectButtonSetProps) {
    return (
        <div>


            <Button
                type='icon'
                value='trashCan'
                onClick={() => dispatch(deleteObject)}
                className='' />
        </div>
    )
}

export { ObjectButtonSet }
