import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './Navbar'
import Login from './Login'
import Signup from './Signup'
import Landing from './Landing'
const Body = () => {
  return (
    <>
        <Navbar/>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Landing/>}>
                    <Route index element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Route>
            </Routes>
        
        </BrowserRouter>
    </>
  )
}

export default Body