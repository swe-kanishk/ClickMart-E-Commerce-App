import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { GoGift } from "react-icons/go";
import { BsBank, BsGraphUpArrow } from "react-icons/bs";
import { FaChartPie } from 'react-icons/fa6';
import { LuChartNoAxesColumn, LuChartNoAxesColumnDecreasing } from "react-icons/lu";
import { RiProductHuntLine } from 'react-icons/ri';


function DashBoardBox() {
  return (
    <>
     <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={false}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className="box bg-blue-600 px-4 py-10 rounded-md cursor-pointer border hover:bg-[#4045e5] flex items-center gap-4 border-gray-200 hover:border-gray-400 transition-all">
                <GoGift size={'45px'} className='text-white' />
                <div className="info w-[50%] whitespace-nowrap">
                    <h3 className='text-white'>New Orders</h3>
                    <b className='text-white'>1,143</b>
                </div>
                <div className='flex -gap-1'>
                    <LuChartNoAxesColumnDecreasing size={'50px'} className='text-white' />
                    <LuChartNoAxesColumn size={'50px'} className='text-white' />
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="box bg-pink-600 px-4 py-10 rounded-md cursor-pointer border hover:bg-[#da4a8d] flex items-center gap-4 border-gray-200 hover:border-gray-400 transition-all">
                <FaChartPie size={'45px'} className='text-[#ffffff]' />
                <div className="info w-[50%] text-white">
                    <h3 >Sales</h3>
                    <b>1,143</b>
                </div>
                <BsGraphUpArrow size={'50px'} className='text-[#ffffff]' />
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="box bg-green-600 px-4 py-10 rounded-md cursor-pointer border hover:bg-[#28943a] flex items-center gap-4 border-gray-200 hover:border-gray-400 transition-all">
                <BsBank size={'40px'} className='text-[#ffffff]' />
                <div className="info text-white w-[50%]">
                    <h3>Revenue</h3>
                    <b>1,143</b>
                </div>
                <BsGraphUpArrow size={'50px'} className='text-[#ffffff]' />
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="box bg-orange-500 px-4 py-10 rounded-md cursor-pointer border hover:bg-[#ef793a] flex items-center gap-4 border-gray-200 hover:border-gray-400 transition-all">
                <RiProductHuntLine size={'50px'} className='text-white' />
                <div className="info text-white w-[50%]">
                    <h3>Total Products</h3>
                    <b>1,143</b>
                </div>
                <BsGraphUpArrow size={'50px'} className='text-white' />
            </div>
        </SwiperSlide>
        </Swiper> 
    </>
  )
}

export default DashBoardBox
