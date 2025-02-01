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
        slidesPerView={3}
        spaceBetween={10}
        navigation={false}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className="box bg-white p-4 rounded-md cursor-pointer border hover:bg-[#fafafa] flex items-center gap-4 border-gray-200 hover:border-gray-400 transition-all">
                <GoGift size={'40px'} className='text-blue-500' />
                <div className="info w-[70%] whitespace-nowrap">
                    <h3 className='text-gray-500'>New Orders</h3>
                    <b>1,143</b>
                </div>
                <div className='flex -gap-2'>
                    <LuChartNoAxesColumnDecreasing size={'50px'} className='text-[#1d60ff]' />
                    <LuChartNoAxesColumn size={'50px'} className='text-[#1d60ff]' />
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="box bg-white p-4 rounded-md cursor-pointer border hover:bg-[#fafafa] flex items-center gap-4 border-gray-200 hover:border-gray-400 transition-all">
                <FaChartPie size={'40px'} className='text-[#10b981]' />
                <div className="info w-[70%]">
                    <h3 className='text-gray-500'>Sales</h3>
                    <b>1,143</b>
                </div>
                <BsGraphUpArrow size={'50px'} className='text-[#10b981]' />
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="box bg-white p-4 rounded-md cursor-pointer border hover:bg-[#fafafa] flex items-center gap-4 border-gray-200 hover:border-gray-400 transition-all">
                <BsBank size={'30px'} className='text-[#7928ca]' />
                <div className="info w-[70%]">
                    <h3 className='text-gray-500'>Revenue</h3>
                    <b>1,143</b>
                </div>
                <BsGraphUpArrow size={'50px'} className='text-[#7928ca]' />
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="box bg-white p-4 rounded-md cursor-pointer border hover:bg-[#fafafa] flex items-center gap-4 border-gray-200 hover:border-gray-400 transition-all">
                <RiProductHuntLine size={'30px'} className='text-blue-500' />
                <div className="info w-[70%]">
                    <h3 className='text-gray-500'>Total Products</h3>
                    <b>1,143</b>
                </div>
                <BsGraphUpArrow size={'50px'} className='text-[#3832fa]' />
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="box bg-white p-4 rounded-md cursor-pointer border hover:bg-[#fafafa] flex items-center gap-4 border-gray-200 hover:border-gray-400 transition-all">
                <GoGift size={'30px'} className='text-blue-500' />
                <div className="info w-[70%]">
                    <h3 className='text-gray-500'>New Orders</h3>
                    <b>1,143</b>
                </div>
                <BsGraphUpArrow size={'50px'} className='text-[#3832fa]' />
            </div>
        </SwiperSlide>
        </Swiper> 
    </>
  )
}

export default DashBoardBox
