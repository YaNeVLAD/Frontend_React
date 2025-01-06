import { useSelectedSlide } from "../../hooks/useSelectedSlide"
import { Button } from "../../components/Button/Button"
import { CSSProperties } from "react"
import styles from "./ColorButton.module.css"
import ArrowDown20Icon from "../../components/common/Icons/ArrowDown20Icon"

type ColorButtonProps = {
    onClick?: () => void,
}

const ColorButton = ({ onClick }: ColorButtonProps) => {
    const selectedSlide = useSelectedSlide()
    if (selectedSlide == undefined) return (<></>)

    const backgroundStyle: CSSProperties = {
        backgroundColor: selectedSlide.background.type == 'solid'
            ? selectedSlide.background.value
            : ''
    }

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
