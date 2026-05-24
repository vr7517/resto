
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import AppProviders from "./context/AppProviders";



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AppProviders>
    
    <App />
  </AppProviders>
  </BrowserRouter>

  
)