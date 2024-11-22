import SideDropdownMenu from "../../components/SideDropdownMenu/SideDropdownMenu"
import Download24Icon from "../../components/common/Icons/Download24Icon"
import { useExportPresentation } from "../../hooks/useExportPresentation"
import { Button } from "../../components/Button/Button"
import Popover from "../../components/Popover/Popover"
import { useState } from "react"
import { useImportPresentation } from "../../hooks/useImportPresentation"

const MenuBar = () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false)

    const { ExportPresentation } = useExportPresentation()

    const { inputRef } = useImportPresentation()

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
                                        onClick={ExportPresentation}
                                        displayType="dropdown">
                                        {'Документ JSON (.json)'}
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