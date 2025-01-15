import { useSelectedSlide } from "../../hooks/useSelectedSlide"
import { Button } from "../../components/Button/Button"
import { CSSProperties } from "react"
import styles from "./ColorButton.module.css"
import ArrowDown20Icon from "../../components/common/Icons/ArrowDown20Icon"
import { selectSlideBackgroundType } from "../../storage/actions/slideActions"

type ColorButtonProps = {
    color?: string,
    onClick?: () => void,
}

const ColorButton = ({ color, onClick }: ColorButtonProps) => {
    const selectedSlide = useSelectedSlide()
    if (selectedSlide == undefined) return (<></>)

    const backgroundStyle: CSSProperties = {
        background: color || ''
    }
    if (!color)
        selectSlideBackgroundType(backgroundStyle, selectedSlide.background)

    return (
        <Button
            type="empty"
            displayType="color-picker"
            onClick={onClick}>
            <>
                <div
                    style={backgroundStyle}
                    className={styles.colorInputButton}>
                </div>
                {ArrowDown20Icon}
            </>
        </Button>
    )
}

export default ColorButton
