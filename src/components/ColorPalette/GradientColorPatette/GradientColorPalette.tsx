import GradientEditorPopup from "../../../views/CustomGradientPopup/CustomGradientPopup"
import Plus20Icon from "../../common/Icons/Plus20Icon"
import { Button } from "../../Button/Button"
import { useState } from "react"
import styles from "./GradientColorPalette.module.css"

type GradientColorPaletteProps = {
    color: string,
    onColorChange: (color: string) => void,
}

const GradientColorPalette = ({ onColorChange }: GradientColorPaletteProps) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const openPopup = () => setIsPopupOpen(true)
    const closePopup = () => setIsPopupOpen(false)

    return (
        <div className={styles.container}>
            <Button
                type="icon&text"
                displayType="dropdown"
                onClick={openPopup}
            >
                {Plus20Icon}
                {'Другой градиент'}
            </Button>
            {isPopupOpen &&
                <GradientEditorPopup
                    setColor={onColorChange}
                    closeAction={closePopup}
                />
            }
        </div>
    )
}

export default GradientColorPalette