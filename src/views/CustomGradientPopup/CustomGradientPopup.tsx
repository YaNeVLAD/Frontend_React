import SolidColorPalette from "../../components/ColorPalette/SolidColorPalette/SolidColorPalette"
import useDragAndDrop from "../../components/SlideObject/hooks/useDragAndDrop"
import SelectList from "../../components/SelectList/SelectList"
import { Button } from "../../components/Button/Button"
import Popover from "../../components/Popover/Popover"
import ColorButton from "../ColorButton/ColorButton"
import Popup from "../../components/Popup/Popup"
import { useMemo, useRef, useState } from "react"
import { uuid } from "../../storage/utils/uuid"
import styles from "./CustomGradientPopup.module.css"

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
    const [colorStops, setColorStops] = useState<{ id: string, color: string; position: number }[]>([
        { id: uuid(), color: '#bfbfbf', position: 0 },
        { id: uuid(), color: '#737373', position: 100 },
    ])
    const [selectedStopId, setSelectedStopId] = useState<string>(colorStops[0].id)
    const [isPaletteOpen, setIsPaletteOpen] = useState(false)
    const trackRef = useRef<HTMLDivElement>(null)

    const { offset, handleMouseDown } = useDragAndDrop(() => moveColorStop(selectedStopId, offset.x))

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
        const selectedIndex = colorStops.findIndex((stop) => stop.id === selectedStopId)
        const newPosition = calculateNewPosition(colorStops, selectedIndex)
        const newColor =
            selectedIndex < colorStops.length - 1
                ? interpolateColor(
                    colorStops[selectedIndex].color,
                    colorStops[selectedIndex + 1].color
                )
                : '#000'

        const newStop = { id: uuid(), color: newColor, position: newPosition }

        setColorStops((prevStops) => {
            const newStops = [...prevStops, newStop].sort((a, b) => a.position - b.position)
            setSelectedStopId(newStop.id)
            return newStops
        })
    }

    const deleteColorStop = () => {
        const selectedStopIndex = colorStops.findIndex(s => s.id == selectedStopId)
        if (selectedStopIndex == -1) return
        if (selectedStopIndex == 0 || selectedStopId == colorStops[colorStops.length - 1].id) return

        setColorStops((prevStops) => {
            const currentIndex = prevStops.findIndex((stop) => stop.id === selectedStopId)
            const updatedStops = prevStops.filter((stop) => stop.id !== selectedStopId)

            const newSelectedStopId =
                currentIndex > 0
                    ? updatedStops[currentIndex - 1].id
                    : updatedStops[0]?.id

            setSelectedStopId(newSelectedStopId || "")
            return updatedStops
        })
    }

    const moveColorStop = (id: string, offsetX: number) => {
        const trackWidth = trackRef.current?.clientWidth || 1
        const delta = (offsetX / trackWidth) * 100

        setColorStops((prevStops) => {
            const updatedStops = prevStops
                .map((stop) =>
                    stop.id === id
                        ? { ...stop, position: Math.min(Math.max(stop.position + delta, 0), 100) }
                        : stop
                )
                .sort((a, b) => a.position - b.position)

            return updatedStops
        })
    }

    const selectColorStop = (id: string) => {
        setSelectedStopId(id)
    }

    const changeColor = (color: string) => {
        setColorStops((prevStops) =>
            prevStops.map((stop) =>
                stop.id === selectedStopId ? { ...stop, color } : stop
            )
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
                                        color={colorStops.find(s => s.id == selectedStopId)?.color || '#000'}
                                        onChange={(e) => changeColor(e.target.value)}
                                        onColorSelect={changeColor}
                                    />
                                }>
                                <ColorButton
                                    color={colorStops.find(s => s.id == selectedStopId)?.color || '#000'}
                                    onClick={() => setIsPaletteOpen(!isPaletteOpen)}
                                />
                            </Popover>
                        </div>
                        <div className={styles.slider}>
                            <div
                                ref={trackRef}
                                className={styles.gradientTrack}
                                style={{
                                    background: `linear-gradient(90deg, ${colorStops
                                        .map((stop) => `${stop.color} ${stop.position}%`)
                                        .join(', ')})`
                                }}
                            >
                                {colorStops.map((stop) => (
                                    <div
                                        key={stop.id}
                                        draggable={false}
                                        className={
                                            `${styles.gradientStop} 
                                            ${selectedStopId === stop.id
                                                ? styles.selected
                                                : ''
                                            } ${stop.id == colorStops[0].id || stop.id == colorStops[colorStops.length - 1].id
                                                ? styles.fixed
                                                : ''}`}
                                        style={{
                                            left: `${stop.position + (selectedStopId == stop.id && trackRef.current
                                                ? (offset.x / trackRef.current.clientWidth) * 100
                                                : 0)}%`,
                                            backgroundColor: stop.color,
                                            cursor: offset.x == 0 ? 'grab' : 'grabbing',
                                            userSelect: 'none'
                                        }}
                                        onMouseDown={(e) => {
                                            selectColorStop(stop.id)
                                            if (selectedStopId !== colorStops[0].id && selectedStopId !== colorStops[colorStops.length - 1].id) {
                                                handleMouseDown(e)
                                                moveColorStop(selectedStopId, offset.x)
                                            }
                                        }}
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