import React, { ReactNode } from 'react'

interface props{
    className:ReactNode
}

const Point = ({className}:props) => {
  return (
    <div className={`bg-gray-400 w-[4px] h-[4px] absolute rounded ${className}`}></div>
  )
}

export default Point