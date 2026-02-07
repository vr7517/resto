import React from 'react'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast';
import Register from './pages/Register';
import {Route,Routes} from "react-router-dom"

const App = () => {
  return (
    <div>
       <Toaster position="top-center" reverseOrder={false} />
       <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={ <Register/>} />
       </Routes>
        
    </div>
  )
}

export default App
