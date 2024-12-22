import EmptySlide from "../../../components/common/SlidePreview/EmptySlide"
import { useAppActions, useAppSelector } from "../../../hooks/useRedux"
import Plus20Icon from "../../../components/common/Icons/Plus20Icon"
import { useSelectedSlide } from "../../../hooks/useSelectedSlide"
import { Button } from "../../../components/Button/Button"
import Popover from "../../../components/Popover/Popover"
import { SlidePreset } from "../../../storage/types"
import { useState } from "react"
import styles from "./PresentationButtonSet.module.css"

const PresentationButtonSet = () => {
    const selectedSlide = useSelectedSlide()
    const theme = useAppSelector(state => state.viewModel.slideTheme)

    const { addSlide } = useAppActions()

    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const closePopover = () => setIsPopoverOpen(false)
    const togglePopover = () => setIsPopoverOpen(!isPopoverOpen)

    const addSlideWithPreset = (preset: SlidePreset, prev: boolean = false) => {
        addSlide(preset, prev, theme)
        closePopover()
    }

    const popoverContent = (
        <>
            <div onClick={() => addSlideWithPreset('title')}>Слайд с заголовком</div>
            <div onClick={() => addSlideWithPreset('image')}>Слайд с картинкой</div>
            <div onClick={() => addSlideWithPreset('none')}><EmptySlide /></div>
            <div onClick={() => addSlideWithPreset('title&text')}>Слайд с текстом</div>
        </>
    )

    return (
        <>
            <div className={styles.addSlideButtonWrapper}>
                <Button
                    type="icon"
                    displayType="tools-area-popover"
                    onClick={() => addSlideWithPreset(
                        selectedSlide?.preset
                            ? selectedSlide.preset
                            : 'none'
                        , true)
                    }>
                    {Plus20Icon}
                </Button>

                <Popover
                    isOpen={isPopoverOpen}
                    togglePopover={togglePopover}
                    closePopover={closePopover}
                    content={popoverContent} />
            </div>
        </>

    )
}

export { PresentationButtonSet }