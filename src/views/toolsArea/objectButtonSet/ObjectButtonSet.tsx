import TextAlignmentCenterVerticalFormat20Icon from "../../../components/common/Icons/TextAlignmentCenterVerticalFormat20Icon"
import { Alignment, FontFamily, FontStyle, FontWeight, TextAlignment, TextAreaType } from "../../../storage/types"
import TextAlignmentBottomFormat20Icon from "../../../components/common/Icons/TextAlignmentBottomFormat20Icon"
import TextAlignmentCenterFormat20Icon from "../../../components/common/Icons/TextAlignmentCenterFormat20Icon"
import TextAlignmentRightFormat20Icon from "../../../components/common/Icons/TextAlignmentRightFormat20Icon"
import TextAlignmentLeftFormat20Icon from "../../../components/common/Icons/TextAlignmentLeftFormat20Icon"
import TextAlignmentTopFormat20Icon from "../../../components/common/Icons/TextAlignmentTopFormat20Icon"
import SolidColorPalette from "../../../components/ColorPalette/SolidColorPalette/SolidColorPalette"
import TextColorFormat20Icon from "../../../components/common/Icons/TextColorFormat20Icon"
import UnderlineFormat20Icon from "../../../components/common/Icons/UnderlineFormat20Icon"
import ItalicFormat20Icon from "../../../components/common/Icons/ItalicFormat20Icon"
import RecycleBin20Icon from "../../../components/common/Icons/RecycleBin20Icon"
import BoldFormat20Icon from "../../../components/common/Icons/BoldFormat20Icon"
import { useSelectedObject } from "../../../hooks/useSelectedObject"
import SelectList from "../../../components/SelectList/SelectList"
import { useSelectedSlide } from "../../../hooks/useSelectedSlide"
import ImageInput from "../../../components/ImageInput/ImageInput"
import { Button } from "../../../components/Button/Button"
import Popover from "../../../components/Popover/Popover"
import { useAppActions } from "../../../hooks/useRedux"
import { useEffect, useState } from "react"
import styles from "./ObjectButtonSet.module.css"


const ObjectButtonSet = () => {
    const slide = useSelectedSlide()
    const object = useSelectedObject()

    const { deleteObject, changeSrcValue } = useAppActions()

    if (slide == undefined || object == undefined) return

    const onDeleteObject = () => deleteObject(slide?.id, object?.id)
    const changeImageSrc = (src: string) => changeSrcValue(object.id, slide.id, src)

    if (object == undefined) return

    return (
        <>
            <Button
                type="icon"
                displayType="tools-area"
                onClick={onDeleteObject}>
                {RecycleBin20Icon}
            </Button>

            {object.type == 'textObj' && (
                <>
                    <TextObjectButtonSet object={object} />
                </>
            )}
            {object.type == 'imageObj' && (
                <>
                    <ImageObjectButtonSet
                        changeSrc={changeImageSrc}
                    />
                </>
            )}
        </>
    )
}

const ImageObjectButtonSet = (
    { changeSrc }: { changeSrc: (src: string) => void }
) => {
    return (
        <>
            <ImageInput
                type="custom"
                onImageUpload={(s) => changeSrc(s)}>
                <Button
                    type="text"
                    displayType="tools-area"
                    onClick={() => { }}>
                    {'Заменить изображение'}
                </Button>
            </ImageInput>
        </>
    )
}

const TextObjectButtonSet = ({ object }: { object: TextAreaType }) => {
    const { changeFontFamily, changeFontSize, changeTextStyle, changeTextColor, changeTextAlignment } = useAppActions()
    const [isBold, setIsBold] = useState(object.text.font.weight == 'Bold')
    const [isItalic, setIsItalic] = useState(object.text.font.style == 'Italic')
    const [isUnderlined, setIsUnderlined] = useState(object.text.decoration == 'underline')
    const [fontSize, setFontSize] = useState(object.text.font.size)
    const [alignment, setAlignment] = useState(object.text.alignment)

    const [isPaletteOpen, setIsPaletteOpen] = useState(false)
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    useEffect(() => {
        setIsBold(object.text.font.weight == 'Bold')
        setIsItalic(object.text.font.style == 'Italic')
        setIsUnderlined(object.text.decoration == 'underline')
        setFontSize(object.text.font.size)
        setAlignment(object.text.alignment)
    }, [object])

    const selectedSlide = useSelectedSlide()
    if (!selectedSlide) return null

    const fontFamilies: Array<FontFamily> = ['Roboto', 'Montserrat', 'Inter', 'Open Sans']

    const toggleBold = () => {
        const newWeight: FontWeight = isBold ? 'Normal' : 'Bold'
        setIsBold(!isBold)
        changeTextStyle(selectedSlide.id, object.id, { weight: newWeight })
    }

    const toggleItalic = () => {
        const newStyle: FontStyle = isItalic ? 'Normal' : 'Italic'
        setIsItalic(!isItalic)
        changeTextStyle(selectedSlide.id, object.id, { style: newStyle })
    }

    const toggleUnderline = () => {
        const newDecoration = isUnderlined ? 'none' : 'underline'
        setIsUnderlined(!isUnderlined)
        changeTextStyle(selectedSlide.id, object.id, { decoration: newDecoration })
    }

    const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(e.target.value, 10)
        if (!isNaN(newSize) && newSize >= 0) {
            setFontSize(newSize)
            changeFontSize(selectedSlide.id, object.id, newSize)
        }
    }

    const updateAlignment = (type: 'horizontal' | 'vertical', value: Alignment) => {
        const newAlignment: TextAlignment = { ...alignment, [type]: value }
        setAlignment(newAlignment)
        changeTextAlignment(selectedSlide.id, object.id, newAlignment)
    }

    return (
        <>
            <div className={styles.separator} />
            <SelectList
                selected={object.text.font.family}
                onChange={(family) => changeFontFamily(selectedSlide.id, object.id, family)}
                options={fontFamilies}
                optionClassName={styles.selectListOption}
                selectedClassName={styles.selectListSelected}
            />
            <div className={styles.separator} />
            <input
                type='number'
                value={fontSize}
                onChange={handleFontSizeChange}
                className={styles.fontSizeInput}
            />
            <div className={styles.separator} />
            <Button
                type="icon"
                displayType="tools-area"
                onClick={toggleBold}
                className={isBold ? styles.selected : ''}
            >
                {BoldFormat20Icon}
            </Button>
            <Button
                type="icon"
                displayType="tools-area"
                onClick={toggleItalic}
                className={isItalic ? styles.selected : ''}
            >
                {ItalicFormat20Icon}
            </Button>
            <Button
                type="icon"
                displayType="tools-area"
                onClick={toggleUnderline}
                className={`${styles.underlineButton} ${isUnderlined ? styles.selected : ''}`}
            >
                {UnderlineFormat20Icon}
            </Button>

            <Popover
                isOpen={isPaletteOpen}
                closePopover={() => setIsPaletteOpen(false)}
                content={<SolidColorPalette color={object.text.font.color}
                    onColorSelect={
                        (color) => changeTextColor(selectedSlide.id, object.id, color)
                    }
                    onChange={(e) => changeTextColor(selectedSlide.id, object.id, e.target.value)}
                />
                }>
                <Button
                    type="icon"
                    displayType="tools-area"
                    onClick={() => setIsPaletteOpen(!isPaletteOpen)}
                >
                    {TextColorFormat20Icon}
                </Button>
            </Popover>

            <Popover
                isOpen={isPopoverOpen}
                closePopover={() => setIsPopoverOpen(false)}
                content={
                    <>
                        <div className={styles.alignmentControls}>
                            <Button
                                type="icon"
                                displayType="tools-area"
                                onClick={() => updateAlignment('horizontal', 'start')}
                                className={alignment.horizontal === 'start' ? styles.selected : ''}
                            >
                                {TextAlignmentLeftFormat20Icon}
                            </Button>
                            <Button
                                type="icon"
                                displayType="tools-area"
                                onClick={() => updateAlignment('horizontal', 'center')}
                                className={alignment.horizontal === 'center' ? styles.selected : ''}
                            >
                                {TextAlignmentCenterFormat20Icon}
                            </Button>
                            <Button
                                type="icon"
                                displayType="tools-area"
                                onClick={() => updateAlignment('horizontal', 'end')}
                                className={alignment.horizontal === 'end' ? styles.selected : ''}
                            >
                                {TextAlignmentRightFormat20Icon}
                            </Button>
                        </div>
                        <div className={styles.alignmentControls}>
                            <Button
                                type="icon"
                                displayType="tools-area"
                                onClick={() => updateAlignment('vertical', 'start')}
                                className={alignment.vertical === 'start' ? styles.selected : ''}
                            >
                                {TextAlignmentTopFormat20Icon}
                            </Button>
                            <Button
                                type="icon"
                                displayType="tools-area"
                                onClick={() => updateAlignment('vertical', 'center')}
                                className={alignment.vertical === 'center' ? styles.selected : ''}
                            >
                                {TextAlignmentCenterVerticalFormat20Icon}
                            </Button>
                            <Button
                                type="icon"
                                displayType="tools-area"
                                onClick={() => updateAlignment('vertical', 'end')}
                                className={alignment.vertical === 'end' ? styles.selected : ''}
                            >
                                {TextAlignmentBottomFormat20Icon}
                            </Button>
                        </div>
                    </>
                }
            >
                <Button
                    type="icon"
                    displayType="tools-area"
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                >
                    {TextAlignmentLeftFormat20Icon}
                </Button>
            </Popover>
        </>
    )
}

export { ObjectButtonSet }
