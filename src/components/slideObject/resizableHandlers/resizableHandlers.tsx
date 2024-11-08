import "./resizableHandlers.css"

function ResizableHandles() {
    return (
        <div className="resizable-object">
            {/* 8 resize handles */}
            <div className="resize-handle top-left" data-handle="top-left" />
            <div className="resize-handle top-right" data-handle="top-right" />
            <div className="resize-handle bottom-left" data-handle="bottom-left" />
            <div className="resize-handle bottom-right" data-handle="bottom-right" />
            <div className="resize-handle top" data-handle="top" />
            <div className="resize-handle right" data-handle="right" />
            <div className="resize-handle bottom" data-handle="bottom" />
            <div className="resize-handle left" data-handle="left" />
        </div>
    )
}

export default ResizableHandles