import React from 'react'
import OverallRating from './OverallRating'

function Ratings({value}) {
  return (
    <div className='flex flex-col items-center'>
      <div className="flex border-b pb-5 items-center gap-6">
        <div className="flex flex-col items-center gap-1 justify-center">
            <OverallRating value={value} />
            <span className='text-gray-500 text-sm'>5 Star</span>
        </div>
        <div className="flex flex-col items-center gap-1 justify-center">
            <OverallRating value={value} />
            <span className='text-gray-500 text-sm'>4 Star</span>
        </div>
        <div className="flex flex-col items-center gap-1 justify-center">
            <OverallRating value={value} />
            <span className='text-gray-500 text-sm'>3 Star</span>
        </div>
        <div className="flex flex-col items-center gap-1 justify-center">
            <OverallRating value={value} />
            <span className='text-gray-500 text-sm'>2 Star</span>
        </div>
        <div className="flex flex-col items-center gap-1 justify-center">
            <OverallRating value={value} />
            <span className='text-gray-500 text-sm'>1 Star</span>
        </div>
      </div>
      <p className='text-start w-full mt-3 text-sm text-gray-600'>Rated by a total of 9,814 users.</p>
    </div>
  )
}

export default Ratings
