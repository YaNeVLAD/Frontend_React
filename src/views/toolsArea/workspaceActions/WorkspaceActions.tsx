import Redo20Icon from "../../../components/common/Icons/Redo20Icon"
import Undo20Icon from "../../../components/common/Icons/Undo20Icon"
import { CommandHistoryContext } from "../../../hooks/historyContext"
import { Button } from "../../../components/Button/Button"
import { useAppActions } from "../../../hooks/useRedux"
import ScaleInput from "./scaleInput/ScaleInput"
import React from "react"

const WorkspaceActions = () => {
    const history = React.useContext(CommandHistoryContext)

    const { setState } = useAppActions()

    const onUndo = () => {
        const newState = history.undo()
        if (newState) setState(newState)
    }

    const onRedo = () => {
        const newState = history.redo()
        if (newState) setState(newState)
    }

    return (
        <>
            <Button
                type="icon"
                displayType="tools-area"
                onClick={onUndo}>
                {Undo20Icon}
            </Button>

            <Button
                type="icon"
                displayType="tools-area"
                onClick={onRedo}>
                {Redo20Icon}
            </Button>

            <ScaleInput />
        </>
    )
}

export default WorkspaceActions