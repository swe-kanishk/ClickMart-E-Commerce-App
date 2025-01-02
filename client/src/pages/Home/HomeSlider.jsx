import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { EffectFade, Navigation, Autoplay, Pagination } from "swiper/modules";
import { Button } from "@mui/material";

function HomeSlider() {
  return (
    <div className="flex items-start justify-between gap-4 overflow-hidden">
        <Swiper
          loop={true}
          spaceBetween={30}
          effect={"fade"}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{}}
          modules={[Navigation, EffectFade, Autoplay, Pagination]}
          className="homeSlider"
        >
          <SwiperSlide>
            <div className="item w-full rounded-md overflow-hidden relative">
              <img
                src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_imageslider/views/img/sample-1.jpg"
                alt=""
              />
              <div className="info absolute top-0 right-[-100%] opacity-0 transition-all duration-700 w-[50%] text-start h-[100%] flex items-start justify-center flex-col z-50 p-8">
                <h4 className="text-[18px] right-[-100%] opacity-0 duration-[2s] relative font-[500]">
                  Big Saving Days Sale
                </h4>
                <h2 className="text-[30px] right-[-100%] opacity-0 duration-[1.5s] relative font-[700]">
                  Women Solid Round Green <br />
                  T-Shirt
                </h2>
                <h3 className="text-[18px] right-[-100%] opacity-0 duration-[1s] relative flex items-center gap-3 font-[500] w-full text-left my-3">
                  Starting At Only{" "}
                  <span className="text-[30px] font-[700] text-red-500">
                    $59
                  </span>
                </h3>
                <Button className="!text-white btn right-[-100%] opacity-0 duration-[2200ms] relative !bg-red-500">
                  Shop Now
                </Button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item w-full rounded-md overflow-hidden relative">
              <img
                src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_imageslider/views/img/sample-2.jpg"
                alt=""
              />
              <div className="info absolute top-0 right-[-100%] opacity-0 transition-all duration-700 w-[45%] text-start h-[100%] flex items-start justify-center flex-col z-50 p-8">
                <h4 className="text-[18px] right-[-100%] opacity-0 duration-[1800ms] relative font-[500]">
                  Big Saving Days Sale
                </h4>
                <h2 className="text-[30px] right-[-100%] opacity-0 duration-[1s] relative font-[700]">
                  Buy Modern Chair In <br />
                  Black Color
                </h2>
                <h3 className="text-[18px] right-[-100%] opacity-0 duration-[1200ms] relative flex items-center gap-3 font-[500] w-full text-left my-3">
                  Starting At Only{" "}
                  <span className="text-[30px] font-[700] text-red-500">
                    $89
                  </span>
                </h3>
                <Button className="!text-white right-[-100%] btn opacity-0 duration-[2200ms] relative !bg-red-500">
                  Shop Now
                </Button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
    </div>
  );
}

export default HomeSlider;
