import SolidColorPalette from "../../components/ColorPalette/SolidColorPalette/SolidColorPalette"
import SelectList from "../../components/SelectList/SelectList"
import { Button } from "../../components/Button/Button"
import Popover from "../../components/Popover/Popover"
import ColorButton from "../ColorButton/ColorButton"
import Popup from "../../components/Popup/Popup"
import { useMemo, useState } from "react"
import styles from "./GradientEditorPopup.module.css"

type GradientEditorPopupProps = {
    setColor: (color: string) => void,
    closeAction: () => void
}

const GradientEditorPopup = ({ setColor, closeAction }: GradientEditorPopupProps) => {
    const gradientTypes = useMemo(() => new Map([['Линейный', 'linear'], ['Радиальный', 'radial']]), [])
    const radialPoints = useMemo(
        () =>
            new Map([
                ['Центр', 'center'],
                ['Сверху слева', 'top left'],
                ['Сверху справа', 'top right'],
                ['Снизу слева', 'bottom left'],
                ['Снизу справа', 'bottom right'],
            ]),
        []
    )

    const [gradientType, setGradientType] = useState<string>('Линейный')
    const [angle, setAngle] = useState<number>(90)
    const [radialPoint, setRadialPoint] = useState<string>('Центр')
    const [colorStops, setColorStops] = useState<{ color: string; position: number }[]>([
        { color: '#bfbfbf', position: 0 },
        { color: '#737373', position: 100 },
    ])
    const [selectedStopIndex, setSelectedStopIndex] = useState<number>(0)
    const [isPaletteOpen, setIsPaletteOpen] = useState(false)

    function interpolateColor(color1: string, color2: string): string {
        const hexToRgb = (hex: string) =>
            hex
                .replace(/^#/, '')
                .match(/.{2}/g)!
                .map((c) => parseInt(c, 16))
        const rgbToHex = (rgb: number[]) =>
            `#${rgb.map((c) => c.toString(16).padStart(2, '0')).join('')}`

        const [r1, g1, b1] = hexToRgb(color1)
        const [r2, g2, b2] = hexToRgb(color2)

        return rgbToHex([
            Math.round((r1 + r2) / 2),
            Math.round((g1 + g2) / 2),
            Math.round((b1 + b2) / 2),
        ])
    }

    function calculateNewPosition(
        stops: { color: string; position: number }[],
        selectedIndex: number
    ): number {
        if (selectedIndex == 0)
            return 50

        const selectedStop = stops[selectedIndex]

        if (selectedIndex < stops.length - 1) {
            const nextStop = stops[selectedIndex + 1]
            return (selectedStop.position + nextStop.position) / 2
        }

        if (selectedIndex == stops.length - 1 && selectedIndex > 0) {
            const prevStop = stops[selectedIndex - 1]
            return (selectedStop.position + prevStop.position) / 2
        }

        return selectedStop.position
    }

    const addColorStop = () => {
        const newPosition = calculateNewPosition(colorStops, selectedStopIndex)
        const newColor =
            selectedStopIndex < colorStops.length - 1
                ? interpolateColor(
                    colorStops[selectedStopIndex].color,
                    colorStops[selectedStopIndex + 1].color
                )
                : '#000000'

        const newStops = [
            ...colorStops,
            { color: newColor, position: newPosition },
        ].sort((a, b) => a.position - b.position)

        const newIndex = newStops.findIndex(
            (stop) => stop.position == newPosition
        )

        setColorStops(newStops)
        setSelectedStopIndex(newIndex)
    }

    const deleteColorStop = () => {
        if (selectedStopIndex !== 0 && selectedStopIndex !== colorStops.length - 1) {
            const newStops = colorStops.filter((_, i) => i !== selectedStopIndex)
            const newIndex =
                selectedStopIndex > 0
                    ? selectedStopIndex - 1
                    : newStops.length > 0
                        ? 0
                        : 0

            setColorStops(newStops)
            setSelectedStopIndex(newIndex)
        }
    }

    const changeColor = (color: string) => {
        setColorStops(
            colorStops.map((stop, i) => (i == selectedStopIndex ? { ...stop, color } : stop))
        )
    }

    const gradient = useMemo(() => {
        if (gradientTypes.get(gradientType) == 'linear') {
            return `linear-gradient(${angle + 90}deg, ${colorStops
                .map((stop) => `${stop.color} ${stop.position}%`)
                .join(', ')})`
        }
        return `radial-gradient(circle at ${radialPoints.get(radialPoint)}, ${colorStops
            .map((stop) => `${stop.color} ${stop.position}%`)
            .join(', ')})`
    }, [gradientType, angle, radialPoint, colorStops, gradientTypes, radialPoints])

    return (
        <Popup
            title={'Другой градиент'}
            closeAction={closeAction}
            content={
                <>
                    <div className={styles.popupGrid}>
                        <div className={styles.row}>
                            <label className={styles.label}>{'Тип'}</label>
                            <SelectList
                                selected={gradientType}
                                onChange={setGradientType}
                                options={Array.from(gradientTypes.keys())}
                            />
                        </div>
                        {gradientTypes.get(gradientType) == 'linear' ? (
                            <div className={styles.row}>
                                <label className={styles.label}>{'Угол'}</label>
                                <SelectList
                                    selected={`${angle}°`}
                                    onChange={(value) => setAngle(parseInt(value))}
                                    options={['0°', '45°', '90°', '135°', '180°', '225°', '270°', '315°']}
                                />
                            </div>
                        ) : (
                            <div className={styles.row}>
                                <label className={styles.label}>{'Центр'}</label>
                                <SelectList
                                    selected={radialPoint}
                                    onChange={setRadialPoint}
                                    options={Array.from(radialPoints.keys())}
                                />
                            </div>
                        )}
                        <div className={styles.preview}>
                            <label className={styles.label}>{'Предварительный просмотр'}</label>
                            <div className={styles.gradientPreview} style={{ background: gradient }} />
                        </div>
                        <div className={styles.controls}>
                            <Button
                                type="text"
                                displayType="image-input"
                                onClick={addColorStop}>
                                {'Добавить'}
                            </Button>
                            <Button
                                type="text"
                                displayType="image-input"
                                onClick={deleteColorStop}>
                                {'Удалить'}
                            </Button>
                            <Popover
                                isOpen={isPaletteOpen}
                                closePopover={() => setIsPaletteOpen(false)}
                                content={
                                    <SolidColorPalette
                                        color={colorStops[selectedStopIndex].color || '#000'}
                                        onChange={() => { }}
                                        onColorSelect={changeColor}
                                    />
                                }>
                                <ColorButton
                                    color={colorStops[selectedStopIndex].color || '#000'}
                                    onClick={() => setIsPaletteOpen(!isPaletteOpen)}
                                />
                            </Popover>
                        </div>
                        <div className={styles.slider}>
                            <div className={styles.gradientTrack} style={{
                                background:
                                    `linear-gradient(90deg, ${colorStops
                                        .map((stop) => `${stop.color} ${stop.position}%`)
                                        .join(', ')})`
                            }}>
                                {colorStops.map((stop, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.gradientStop} 
                                        ${index == 0 || index == colorStops.length - 1
                                                ? styles.fixed
                                                : ''
                                            } ${selectedStopIndex == index
                                                ? styles.selected
                                                : ''}`
                                        }
                                        style={{ left: `${stop.position}%`, backgroundColor: stop.color }}
                                        onClick={() => setSelectedStopIndex(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            }
            footer={
                <div className={styles.footer}>
                    <Button
                        type="text"
                        displayType="image-input"
                        onClick={closeAction}>
                        {'Отмена'}
                    </Button>
                    <Button
                        type="text"
                        displayType="popup-submit"
                        onClick={() => {
                            setColor(gradient)
                            closeAction()
                        }}>
                        {'OK'}
                    </Button>
                </div>
            }
        />
    )
}

export default GradientEditorPopup