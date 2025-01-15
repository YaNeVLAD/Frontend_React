import SolidColorPalette from "../../../components/ColorPalette/SolidColorPalette/SolidColorPalette"
import TextColorFormat20Icon from "../../../components/common/Icons/TextColorFormat20Icon"
import UnderlineFormat20Icon from "../../../components/common/Icons/UnderlineFormat20Icon"
import { FontFamily, FontStyle, FontWeight, TextAreaType } from "../../../storage/types"
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
    const { changeFontFamily, changeFontSize, changeTextStyle, changeTextColor } = useAppActions()
    const [isBold, setIsBold] = useState(object.text.font.weight == 'Bold')
    const [isItalic, setIsItalic] = useState(object.text.font.style == 'Italic')
    const [isUnderlined, setIsUnderlined] = useState(object.text.decoration == 'underline')
    const [fontSize, setFontSize] = useState(object.text.font.size)

    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    useEffect(() => {
        setIsBold(object.text.font.weight == 'Bold')
        setIsItalic(object.text.font.style == 'Italic')
        setIsUnderlined(object.text.decoration == 'underline')
        setFontSize(object.text.font.size)
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
                isOpen={isPopoverOpen}
                closePopover={() => setIsPopoverOpen(false)}
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
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                >
                    {TextColorFormat20Icon}
                </Button>
            </Popover>
        </>
    )
}

export { ObjectButtonSet }
