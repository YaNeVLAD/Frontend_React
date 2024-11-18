import ReactDOM from "react-dom/client"
import configureStore from "./storage/redux/store.ts"
import { Provider } from "react-redux"
import App from "./App.tsx"

(async () => {
  const store = await configureStore()

  const rootElement = document.getElementById("root")
  if (!rootElement) {
    throw new Error("Root element not found")
  }

  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
})()