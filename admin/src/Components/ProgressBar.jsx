import React from 'react'

function ProgressBar({value, type}) {
  return (
    <div className='w-[100px] h-auto overflow-hidden rounded-md bg-[#f1f1f1]'>
      <span className={`flex items-center w-[${value}%] h-[8px] ${type === 'success' && 'bg-green-500'} ${type === 'warning' && 'bg-orange-400'} ${type === 'error' && 'bg-pink-500'}`}></span>
    </div>
  )
}

export default ProgressBar
