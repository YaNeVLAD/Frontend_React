import ArrowDown20Icon from "../../components/common/Icons/ArrowDown20Icon"
import { SlideShowRoute, SpeakerViewerRoute } from "../../storage/utils/createPath"
import { useAppActions, useAppSelector } from "../../hooks/useRedux"
import useNavigateWithParams from "../../hooks/useNavigateToRoute"
import { useSelectedSlide } from "../../hooks/useSelectedSlide"
import { Button } from "../../components/Button/Button"
import { PresentationType } from "../../storage/types"
import Popover from "../../components/Popover/Popover"
import TitleInput from "./TitleInput/TitleInput"
import MenuBar from "../MenuBar/MenuBar"
import { useState } from "react"
import style from "./TitleArea.module.css"

const TitleArea = () => {
    const navigateWithParams = useNavigateWithParams()
    const { changePresentationTitle } = useAppActions()
    const presentation = useAppSelector(state => state.editor.presentation)
    const selectedSlide = useSelectedSlide() || presentation.slides[0]
    const selectedSlideIndex = presentation.slides.indexOf(selectedSlide)
    const title = presentation.title

    const startSlideShowFromSelectedSlide = () =>
        navigateWithParams(SlideShowRoute, { from: selectedSlideIndex }, { replace: true })

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
                        onClick={startSlideShowFromSelectedSlide}>
                        {'Слайд-шоу'}
                    </Button>
                    <ViewersPopover presentation={presentation} />
                </div>
            </div >
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

    const startSpeakerSlideShow = () => navigateWithParams(SpeakerViewerRoute, { id: id })
    const startSlideShowFromFirstSlide = () => navigateWithParams(SlideShowRoute, { from: 0 }, { replace: true })

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
                            onClick={startSpeakerSlideShow}>
                            {'Режим докладчика'}
                        </Button>
                        <Button
                            type="text"
                            displayType="dropdown"
                            onClick={startSlideShowFromFirstSlide}>
                            {'Начать сначала'}
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