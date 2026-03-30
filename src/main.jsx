import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AppProvider} from './Context/AppContext.jsx'
import React from "react";

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </React.StrictMode>
)
