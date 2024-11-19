import EmptySlide from "../../../components/common/SlidePreview/EmptySlide"
import { useGetSelectedSlide } from "../../../hooks/useGetSelectedSlide"
import Plus20Icon from "../../../components/common/Icons/Plus20Icon"
import { Button } from "../../../components/Button/Button"
import Popover from "../../../components/Popover/Popover"
import { useAppActions } from "../../../hooks/useRedux"
import { SlidePreset } from "../../../storage/types"
import { useState } from "react"
import styles from "./PresentationButtonSet.module.css"

const PresentationButtonSet = () => {
    const selectedSlide = useGetSelectedSlide()

    const { addSlide } = useAppActions()

    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const closePopover = () => setIsPopoverOpen(false)
    const togglePopover = () => setIsPopoverOpen(!isPopoverOpen)

    const addSlideWithPreset = (preset: SlidePreset, prev: boolean = false) => {
        addSlide(selectedSlide?.id, preset, prev)
        closePopover()
    }

    const popoverContent = (
        <>
            <div onClick={() => addSlideWithPreset('title')}>Слайд с заголовком</div>
            <div onClick={() => addSlideWithPreset('image')}>Слайд с картинкой</div>
            <div onClick={() => addSlideWithPreset('title&image')}>Слайд с заголовком и картинкой</div>
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
                    onClick={() => addSlideWithPreset('none', true)}>
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