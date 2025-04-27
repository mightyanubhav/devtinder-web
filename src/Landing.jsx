import React from 'react'
import { Outlet } from "react-router-dom";
import {  useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from './utils/constants'
import { setUser } from './utils/userSlice'
import { useEffect } from "react"

const Landing = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fetchUser = async () =>{
        try{
            const res = await axios.get(BASE_URL + 'profile/view', {
                withCredentials: true,
            })
            dispatch(setUser(res.data));
  
        }catch(e){
            navigate("/")
            console.log(e)
        }
    }
  
    useEffect(() =>{
        fetchUser()
    },[]);
  
  return (
    <div className='flex justify-center items-center mt-3'>
        <Outlet/>
    </div>
  )
}

export default Landing