import React from 'react'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast';
import Register from './pages/Register';

const App = () => {
  return (
    <div>
       <Toaster position="top-center" reverseOrder={false} />
      {/* <Login/> */}
      <Register/>
    </div>
  )
}

export default App
