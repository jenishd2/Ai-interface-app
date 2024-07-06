import React from 'react'
import "../App.css"
export default function HistoryTitle({title,classname,...props}) {
  return (
    <div className='w-full h-[40px] cursor-pointer p-2 hover:bg-gray-500 rounded  flex items-center justify-start' {...props}>
      <h1 className='h-7  overflow-hidden text-xl'>{title}</h1>
    </div>
  )
}
