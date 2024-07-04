import React from 'react'
import {Logout} from './index'

export default function Header() {
  const email = JSON.parse(localStorage.getItem("auth")).email
  return (
    <header className='w-full bg-black h-[50px] relative flex justify-center items-center'>
      <h1 className='text-white'>Hello {email}</h1>
      <Logout classname="right-5 absolute"/>
    </header>
  )
}
