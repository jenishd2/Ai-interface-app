import React from 'react'
import {Button} from './index'
import axios from 'axios'
import { logout } from '../store/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function Logout({classname}) {
  const accessToken = localStorage.getItem("accessToken")
  // console.log(accessToken)
  const dispatch = useDispatch()
  const navigate =  useNavigate()
  const Handlelogout = async()=>{
     try {
       const response = await axios.post("http://localhost:8000/api/v1/users/logout",
         {
           accessToken:accessToken
         })
      //  console.log(response)
      const status = false
      navigate("/login")
       dispatch(logout(status))
       localStorage.removeItem("accessToken")
       localStorage.setItem("status",false)
       localStorage.removeItem("auth")
      //  localStorage.setItem("authentication",false)
     } catch (error) {
      console.log(error.message)
     }
  }
  return (
    <div className={classname}>
      <Button children="Logout" onClick={Handlelogout} classname="border-2 rounded text-xl p-1" />
    </div>
  )
}
