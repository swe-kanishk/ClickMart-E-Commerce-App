import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { Navigation, Autoplay, Pagination, Mousewheel, Keyboard } from "swiper/modules";

function HomeSlider() {
  return (
    <div className="container flex items-start justify-between py-4 gap-4 overflow-hidden">
      <div className="w-[70%]">
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Autoplay, Pagination, Mousewheel, Keyboard]}
        autoplay={{delay: 2500, disableOnInteraction: false}}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_imageslider/views/img/sample-1.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_imageslider/views/img/sample-2.jpg"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
      </div>
      <div className="flex w-[30%] !h-[100%] flex-col overflow-hidden items-end justify-between gap-3">
        <div className="group overflow-hidden h-1/2 rounded-lg relative">
            <div className="absolute top-[2rem] z-50 left-[2rem]"><h3 className="font-medium pb-4 text-xl">Samsung Gear <br />
            VR Camera</h3>
            <span className="text-red-500 font-medium tex-[15px]">$129.00</span>
            </div>
          <img
            src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-1.jpg"
            alt=""
            className="group-hover:scale-105 h-[100%] transition-transform object-cover"
          />
        </div>
        <div className="group overflow-hidden h-1/2 rounded-lg relative">
          <img
            src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/img/cms/sub-banner-2.jpg"
            alt=""
            className="group-hover:scale-105 h-[100%] transition-transform object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default HomeSlider;