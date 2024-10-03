import style from './ToolsArea.module.css'

type ToolsAreaProps = {
    title: string
}


function ToolsArea(toolsAreaProps: ToolsAreaProps) {
    return (
        <div className={style.toolsArea}>
            <h2 className={style.presentationTitle}>
                {toolsAreaProps.title}
            </h2>
        </div>
    )
}

export { ToolsArea }