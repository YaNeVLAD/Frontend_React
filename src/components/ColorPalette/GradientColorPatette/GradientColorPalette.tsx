import SolidColorPalette from "../SolidColorPalette/SolidColorPalette"
import ColorButton from "../../../views/ColorButton/ColorButton"
import Plus20Icon from "../../common/Icons/Plus20Icon"
import SelectList from "../../SelectList/SelectList"
import { Button } from "../../Button/Button"
import Popover from "../../Popover/Popover"
import { useMemo, useState } from "react"
import Popup from "../../Popup/Popup"
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

type GradientEditorPopupProps = {
    setColor: (color: string) => void,
    closeAction: () => void,
}

const linearText = 'Линейный'
const radialText = 'Радиальный'

const linear = 'linear'
const radial = 'radial'

function calculateNewPosition(stops: { color: string; position: number }[], selectedIndex: number | null) {
    if (selectedIndex === null) return 100

    const selectedStop = stops[selectedIndex]

    if (selectedIndex < stops.length - 1) {
        const nextStop = stops[selectedIndex + 1]
        return (selectedStop.position + nextStop.position) / 2
    }

    if (selectedIndex === stops.length - 1 && selectedIndex > 0) {
        const prevStop = stops[selectedIndex - 1]
        return (selectedStop.position + prevStop.position) / 2
    }

    return selectedStop.position
}

const GradientEditorPopup = ({ setColor, closeAction }: GradientEditorPopupProps) => {
    const gradientTypes = useMemo(() => {
        const typesMap = new Map<string, string>()
        typesMap
            .set(linearText, linear)
            .set(radialText, radial)
        return typesMap
    }, [])

    const radialPoints = useMemo(() => {
        const pointsMap = new Map<string, string>()
        pointsMap
            .set('Центр', 'center')
            .set('Сверху слева', 'top left')
            .set('Сверху справа', 'top right')
            .set('Снизу слева', 'bottom left')
            .set('Снизу справа', 'bottom right')
        return pointsMap
    }, [])

    const [gradientType, setGradientType] = useState<string>(linearText)
    const [angle, setAngle] = useState<number>(90)
    const [radialPoint, setRadialPoint] = useState<string>('Центр')
    const [colorStops, setColorStops] = useState<{ color: string; position: number }[]>([
        { color: '#eeeeee', position: 0 },
        { color: '#737373', position: 100 },
    ])
    const [selectedStopIndex, setSelectedStopIndex] = useState<number | null>(null)
    const [isPaletteOpen, setIsPaletteOpen] = useState(false)

    const changeType = (type: string) => setGradientType(type)

    const addColorStop = () => {
        const newPosition = calculateNewPosition(colorStops, selectedStopIndex)
        setColorStops(
            [...colorStops, { color: '#000000', position: newPosition }].sort(
                (a, b) => a.position - b.position
            )
        )
    }

    const removeColorStop = () => {
        if (selectedStopIndex !== null) {
            setColorStops(colorStops.filter((_, i) => i !== selectedStopIndex))
            setSelectedStopIndex(null)
        }
    }

    const changeColor = (color: string) => {
        if (selectedStopIndex !== null) {
            setColorStops(
                colorStops.map((stop, i) =>
                    i === selectedStopIndex ? { ...stop, color } : stop
                )
            )
        }
    }

    const confirmColorChange = () => {
        setColor(gradient)
        closeAction()
    }

    const gradient = useMemo(() => {
        if (gradientTypes.get(gradientType) == linear) {
            return `linear-gradient(${angle + 90}deg, ${colorStops
                .map((stop) => `${stop.color} ${stop.position}%`)
                .join(', ')})`
        }
        return `radial-gradient(circle at ${radialPoints.get(radialPoint)}, ${colorStops
            .map((stop) => `${stop.color} ${stop.position}%`)
            .join(', ')})`
    }, [gradientTypes, gradientType, radialPoints, radialPoint, colorStops, angle])

    const GradientSettingsRow = () => (
        <>
            <div className={styles.row}>
                <label className={styles.label}>Тип</label>
                <SelectList
                    selected={gradientType}
                    onChange={changeType}
                    options={Array.from(gradientTypes.keys())}
                />
            </div>
            {gradientTypes.get(gradientType) == linear ? (
                <div className={styles.row}>
                    <label className={styles.label}>Угол</label>
                    <SelectList
                        selected={`${angle}°`}
                        onChange={(value) => setAngle(parseInt(value))}
                        options={['0°', '45°', '90°', '135°', '180°', '225°', '270°', '315°']}
                    />
                </div>
            ) : (
                <div className={styles.row}>
                    <label className={styles.label}>Точка центра</label>
                    <SelectList
                        selected={radialPoint}
                        onChange={(value) => setRadialPoint(value)}
                        options={Array.from(radialPoints.keys())}
                    />
                </div>
            )}
        </>
    )

    return (
        <Popup
            title={'Другой градиент'}
            closeAction={closeAction}
            content={
                <div className={styles.popupContainer}>
                    <GradientSettingsRow />
                    <div className={styles.row}>
                        <label className={styles.label}>Контрольные точки градиента</label>
                        <div className={styles.actions}>
                            <Button type="text" displayType="image-input" onClick={addColorStop}>
                                {'Добавить'}
                            </Button>
                            <Button type="text" displayType="image-input" onClick={removeColorStop}>
                                {'Удалить'}
                            </Button>
                            {selectedStopIndex !== null && (
                                <div className={styles.row}>
                                    <Popover
                                        isOpen={isPaletteOpen}
                                        closePopover={() => setIsPaletteOpen(false)}
                                        content={
                                            <SolidColorPalette
                                                color={colorStops[selectedStopIndex].color}
                                                onChange={(e) =>
                                                    changeColor(e.target.value)
                                                }
                                                onColorSelect={(color) =>
                                                    changeColor(color)
                                                }
                                            />
                                        }
                                    >
                                        <ColorButton
                                            color={colorStops[selectedStopIndex].color}
                                            onClick={() => setIsPaletteOpen(true)}
                                        />
                                    </Popover>
                                </div>
                            )}
                        </div>
                        <div className={styles.colorStops}>
                            {colorStops.map((stop, index) => (
                                <div key={index} className={styles.colorStop}>
                                    <input
                                        type="number"
                                        value={stop.position}
                                        onChange={(e) =>
                                            setColorStops(
                                                colorStops.map((s, i) =>
                                                    i === index ? { ...s, position: parseInt(e.target.value) } : s
                                                )
                                            )
                                        }
                                        onClick={() => setSelectedStopIndex(index)}
                                        className={styles.input}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.row}>
                        <label className={styles.label}>Предварительный просмотр</label>
                        <div className={styles.gradientPreview} style={{ background: gradient }}></div>
                    </div>
                </div>
            }
            footer={<GradientEditorPopupFooter closeAction={closeAction} confirmAction={confirmColorChange} />}
        />
    )
}

type GradientEditorPopupFooterProps = {
    closeAction: () => void,
    confirmAction: () => void
}

const GradientEditorPopupFooter = ({ closeAction, confirmAction }: GradientEditorPopupFooterProps) => {
    return (
        <div className={styles.footer}>
            <Button type="text" displayType="image-input" onClick={closeAction}>
                {'Отмена'}
            </Button>
            <Button
                type="text"
                displayType="popup-submit"
                onClick={confirmAction}
            >
                {'ОК'}
            </Button>
        </div>
    )
}

export default GradientColorPalette