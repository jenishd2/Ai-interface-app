import React from 'react'
import {Logout} from './index'

export default function Header() {
  return (
    <header className='w-full bg-black h-[50px] relative flex justify-center items-center'>
      <Logout classname="right-5 absolute"/>
    </header>
  )
}
