import { Button } from "../../../components/Button/Button"
import { CommandHistoryContext } from "../../../hooks/historyContext"
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
                type="text"
                displayType="tools-area"
                onClick={onRedo}>
                {'Redo'}
            </Button>

            <Button
                type="text"
                displayType="tools-area"
                onClick={onUndo}>
                {'Undo'}
            </Button>
            <ScaleInput />
        </>
    )
}

export default WorkspaceActions