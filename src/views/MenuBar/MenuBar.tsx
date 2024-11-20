import SideDropdownMenu from "../../components/SideDropdownMenu/SideDropdownMenu"
import { Button } from "../../components/Button/Button"
import { useState } from "react"

const MenuBar = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div>
            <SideDropdownMenu
                isOpen={isOpen}
                onOpen={() => setIsOpen(true)}
                onClose={() => setIsOpen(false)}
                content={<>123 123 123</>}>
                <Button
                    type="text"
                    displayType="tools-area"
                    onClick={() => setIsOpen(!isOpen)}>
                    {'Скачать'}
                </Button>
            </SideDropdownMenu>
        </div>
    )
}

export default MenuBar
