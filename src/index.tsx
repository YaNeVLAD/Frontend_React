import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { addPresentationChangeHandler, getPresentation } from './storage/presentation.ts'

function render() {
  const root = createRoot(document.getElementById('root')!)
  root.render(
    <StrictMode>
      <App presentation={getPresentation()}/>
    </StrictMode>,
  )

  console.log(getPresentation())
}

addPresentationChangeHandler(render)
render()