import React from 'react'
import { FaRegImages } from "react-icons/fa";

function UploadProductBox({multiple}) {
  return (
    <div className='p-3 rounded-md h-[100%] flex-col relative w-[170px] flex items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200 hover:border-gray-600 overflow-hidden border-dashed border border-gray-400 '>
        <FaRegImages size={'40px'} className='opacity-50 pointer-events-none' />
      <h4 className='text-[14px] pointer-events-none text-gray-500'>Image Upload</h4>
      <input type="file" multiple={multiple !== 'undefined' ? multiple : 'false'} className='absolute top-0 opacity-0 left-0 w-full h-full z-50' />
    </div>
  )
}

export default UploadProductBox
