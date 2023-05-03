import React from 'react'
import ReactDOM from 'react-dom'
import './input.css'
import App from './components/App'
import { BrowserRouter } from 'react-router-dom'
// import { ContextProvider } from './contexts/ContextProvider'; 

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);