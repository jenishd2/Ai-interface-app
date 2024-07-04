import React from 'react'

export default function Button({
    children,
    type,
    classname,
    ...props
}) {
  return (
    <button className={`${classname}`}{...props}>{children}</button>
  )
}
