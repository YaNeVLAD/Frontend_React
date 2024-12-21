import SideDropdownMenu from "../../components/SideDropdownMenu/SideDropdownMenu"
import { useImportPresentation } from "../../hooks/useImportPresentation"
import Download24Icon from "../../components/common/Icons/Download24Icon"
import { useExportPresentation } from "../../hooks/useExportPresentation"
import convertPresentationToPdf from "../../storage/file/convert"
import { Button } from "../../components/Button/Button"
import Popover from "../../components/Popover/Popover"
import { useAppSelector } from "../../hooks/useRedux"
import { useState } from "react"

const MenuBar = () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const { exportPresentation } = useExportPresentation()

    const { inputRef } = useImportPresentation()

    const presentation = useAppSelector(state => state.editor.presentation)

    const presentationToPdf = () => convertPresentationToPdf(presentation)

    return (
        <div>
            <Popover
                isOpen={isPopoverOpen}
                closePopover={() => setIsPopoverOpen(false)}
                content={
                    <>
                        <SideDropdownMenu
                            content={
                                <>
                                    <Button
                                        type="text"
                                        onClick={exportPresentation}
                                        displayType="dropdown">
                                        {'Файл JSON (.json)'}
                                    </Button>
                                    <Button
                                        type="text"
                                        displayType="dropdown"
                                        onClick={presentationToPdf}>
                                        {'Документ PDF (.pdf)'}
                                    </Button>
                                </>}>
                            <Button
                                type="icon&text"
                                displayType="dropdown">
                                {Download24Icon}
                                {'Скачать'}
                            </Button>
                        </SideDropdownMenu>
                        <Button
                            type="icon&text"
                            onClick={() => inputRef.current?.click()}
                            displayType="dropdown">
                            {Download24Icon}
                            {'Импорт слайдов'}
                        </Button>
                        <input ref={inputRef} type="file" style={{ display: "none" }} accept=".json" />
                    </>}>
                <Button
                    type="text"
                    displayType="tools-area"
                    onClick={() => setIsPopoverOpen(true)}>
                    {'Файл'}
                </Button>
            </Popover>

        </div>
    )
}

export default MenuBar