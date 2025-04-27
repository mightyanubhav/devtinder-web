import React from 'react'
import { Outlet } from "react-router-dom";
import {  useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from './utils/constants'
import { setUser } from './utils/userSlice'
import { useEffect } from "react"

const Landing = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((store) => store.user)

    const fetchUser = async () =>{
        try{
            const res = await axios.get(BASE_URL + 'profile/view', {
                withCredentials: true,
            })
            dispatch(setUser(res.data));
  
        }catch (e) {
            if (e.response?.status === 401) {
              navigate("/")
            }
            console.log(e)
          }
          
    }
  
    useEffect(() =>{
        if(!userData){
            fetchUser()
        }
    },[]);
  
  return (
    <div className='flex justify-center items-center mt-3'>
        <Outlet/>
    </div>
  )
}

export default Landing