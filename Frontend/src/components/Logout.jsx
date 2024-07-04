import React from 'react'
import {Button} from './index'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
export default function Logout({classname}) {
  // const accessToken = useSelector((state)=>state.auth.accessToken)
  // console.log(accessToken)
  const dispatch = useDispatch()
  const logout = async()=>{
     try {
       const response = await axios.post("http://localhost:8000/api/v1/users/logout",
         {
           accessToken:localStorage.getItem("accessToken")
         })
       console.log(response)
       dispatch(logout())
       localStorage.removeItem("accessToken")
     } catch (error) {
      console.log(error.message)
     }
  }
  return (
    <div className={classname}>
      <Button children="Logout" onClick={logout} classname="border-2 rounded text-xl p-1" />
    </div>
  )
}
