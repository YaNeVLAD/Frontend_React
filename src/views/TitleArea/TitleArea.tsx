import ArrowDown20Icon from "../../components/common/Icons/ArrowDown20Icon"
import { SpeakerViewerRoute } from "../../storage/utils/createPath"
import { useAppActions, useAppSelector } from "../../hooks/useRedux"
import useNavigateWithParams from "../../hooks/useNavigateToRoute"
import { Button } from "../../components/Button/Button"
import Popover from "../../components/Popover/Popover"
import TitleInput from "./TitleInput/TitleInput"
import { useState } from "react"
import style from "./TitleArea.module.css"
import { PresentationType } from "../../storage/types"
import MenuBar from "../MenuBar/MenuBar"

const TitleArea = () => {
    const { changePresentationTitle } = useAppActions()
    const presentation = useAppSelector(state => state.editor.presentation)
    const title = presentation.title

    const onTitleChange = (newTitle: string) => {
        changePresentationTitle(newTitle)
    }

    return (
        <>
            <div className={style.titleContainer}>
                <TitleInput title={title} onTitleChange={onTitleChange} />

                <div className={style.slideShowButton}>
                    <Button
                        type="text"
                        displayType="slide-show"
                        onClick={() => { }}>
                        {'Слайд-шоу'}
                    </Button>
                    <ViewersPopover presentation={presentation} />
                </div>
            </div>
            <MenuBar />
        </>
    )
}

type ViewersPopoverProps = {
    presentation: PresentationType
}

const ViewersPopover = ({ presentation }: ViewersPopoverProps) => {
    const id = presentation.id

    const navigateWithParams = useNavigateWithParams()
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)
    const navigateToSpeakerViewer = () => navigateWithParams(SpeakerViewerRoute, { id: id })

    return (
        <>
            <Popover
                isOpen={isPopoverOpen}
                closePopover={() => setIsPopoverOpen(false)}
                content={
                    <>
                        <Button
                            type="text"
                            displayType="dropdown"
                            onClick={navigateToSpeakerViewer}>
                            {'Режим докладчика'}
                        </Button>
                    </>
                }>
                <Button
                    type="icon"
                    displayType="slide-show-popover"
                    onClick={() => setIsPopoverOpen(true)}>
                    {ArrowDown20Icon}
                </Button>
            </Popover>
        </>
    )
}


export default TitleArea