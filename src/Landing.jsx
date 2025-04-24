import React from 'react'
import { Link, Outlet } from "react-router-dom";


const Landing = () => {
  return (
    <div className='flex justify-center items-center mt-3'>
        <Outlet/>
    </div>
  )
}

export default Landing