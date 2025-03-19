import React from 'react'

function HomeBannerSliderSkelton({animate}) {
  return (
    <div role="status" className={`space-y-8 flex relative h-full rounded-md items-center justify-center bg-gray-200 ${animate && 'animate-pulse'} md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center`}>
    <div className="flex items-center justify-center w-full h-48 bg-gray-200 rounded-sm sm:w-96">
        <svg className="w-10 h-10 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
    </div>
        <div class="w-[30%] absolute top-1/3 right-12">
        <div class="h-1.5 bg-gray-300 rounded-full w-32 mb-8"></div>
        <div class="h-3 bg-gray-300 rounded-full mb-5"></div>
        <div class="h-2.5 bg-gray-300 rounded-full max-w-[460px] mb-6"></div>
        <div class="h-5 bg-gray-300 rounded-full max-w-[84px] mb-2.5"></div>
    </div>
    </div>
  )
}

export default HomeBannerSliderSkelton;
