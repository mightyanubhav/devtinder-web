import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from './Navbar'
import Login from './Login'
import Signup from './Signup'
import Landing from './Landing'
import Feed from './Feed'

const Body = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />}>
          <Route index element={<Login />} />
          <Route path='feed' element={<Feed/>}/>
          <Route path='signup' element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Body
