import EmptySlide from "../../../components/common/slideTypes/EmptySlide"
import { useGetSelectedSlide } from "../../../hooks/useGetSelectedSlide"
import Plus20Icon from "../../../components/common/icons/Plus20Icon"
import { Button } from "../../../components/button/Button"
import { useAppActions } from "../../../hooks/useRedux"

const PresentationButtonSet = () => {
    const selectedSlide = useGetSelectedSlide()
    const { addSlide } = useAppActions()

    if (selectedSlide == undefined) return (<></>)

    const popoverContent = (
        <>
            <div onClick={() => addSlide(selectedSlide.id, 'title')}>Слайд с заголовком</div>
            <div onClick={() => addSlide(selectedSlide.id, 'image')}>Слайд с картинкой</div>
            <div onClick={() => addSlide(selectedSlide.id, 'title&image')}>Слайд с заголовком и картинкой</div>
            <div onClick={() => addSlide(selectedSlide.id, 'none')}><EmptySlide /></div>
            <div onClick={() => addSlide(selectedSlide.id, 'title&text')}>Слайд с текстом</div>
        </>
    )

    return (
        <>
            <Button
                type="icon"
                displayType="tools-area-popover"
                onClick={() => addSlide(selectedSlide.id, selectedSlide.preset, true)}
                popoverContent={popoverContent}>
                {Plus20Icon}
            </Button >
        </>

    )
}

export { PresentationButtonSet }