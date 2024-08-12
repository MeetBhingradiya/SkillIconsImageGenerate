import ReactDOM from 'react-dom/client'
import { NextUIProvider } from "@nextui-org/react";
import App from './App.tsx'
import "./Styles/tailwind.css"
import "./Styles/Global.sass"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <NextUIProvider>
        <App />
    </NextUIProvider>
)