import { Button } from "../../../components/button/Button"
import { SlideObjectType } from "../../../storage/types"
import { dispatch } from "../../../storage/editor"
import { deleteObject } from "../../../storage/actions/objectActions"
import RecycleBin20Icon from "../../../components/common/icons/RecycleBin20Icon"

type ObjectButtonSetProps = {
    object: SlideObjectType
}

function ObjectButtonSet({ object }: ObjectButtonSetProps) {
    return (
        <div>
            <Button
                icon={RecycleBin20Icon}
                text=""
                onClick={() => dispatch(deleteObject)}
                className='' />
            {object.type == 'textObj' && (<div>TEXT</div>)}
            {object.type == 'imageObj' && (<div>IMAGE</div>)}
        </div>
    )
}

export { ObjectButtonSet }
