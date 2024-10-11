import { addEditorChangeHandler, getEditor } from './storage/editor.ts'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

const root = createRoot(document.getElementById('root')!)
function render() {
  root.render(
    <StrictMode>
      <App editor={getEditor()} />
    </StrictMode>,
  )
}

addEditorChangeHandler(render)
render()