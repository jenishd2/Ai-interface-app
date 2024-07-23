import React from 'react'
import {Button} from './index'
import axios from 'axios'
import { logout } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function Logout({classname}) {
  const accessToken = localStorage.getItem("accessToken")
  const refreshToken = localStorage.getItem("refreshtoken")
  const dispatch = useDispatch()
  const navigate =  useNavigate()
  const Handlelogout = async()=>{
     try {
       const response = await axios.post("http://localhost:8000/api/v1/users/logout",
         {
           accessToken:accessToken
         })
      const status = false
      navigate("/login")
       dispatch(logout(status))
       localStorage.removeItem("accessToken")
       localStorage.removeItem("refreshToken")
       localStorage.setItem("status",false)
       localStorage.removeItem("auth")
     } catch (error) {
      if(error.message == "Request failed with status code 401"){
        await axios.post("http://localhost:8000/api/v1/users/refresh-token",{
          refreshToken:refreshToken
        })
      }
      console.log(error.message)
     }
  }
  return (
    <div className={classname}>
      <Button children="Logout" onClick={Handlelogout} classname="border-2 rounded text-xl p-1" />
    </div>
  )
}
