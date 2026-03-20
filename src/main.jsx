import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-dom' // Error here: Should be react-router-dom, I will fix.
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
