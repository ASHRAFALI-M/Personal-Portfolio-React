import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './fonts.css'
import './index.css'

// Note: StrictMode is intentionally not used. The page drives two canvases
// and many imperative DOM effects; StrictMode's double-invoked effects in
// dev would double-initialize them.
createRoot(document.getElementById('root')).render(<App />)
