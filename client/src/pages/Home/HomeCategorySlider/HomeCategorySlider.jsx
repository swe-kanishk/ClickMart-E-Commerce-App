import React, { useContext, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./style.css";

// import required modules
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { MyContext } from "../../../App";

function HomeCategorySlider() {
  const context = useContext(MyContext);

  return (
    <div className="container homeCatSlider py-6">
      <Swiper
        slidesPerView={7}
        spaceBetween={15}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {context?.categoryData?.map((cat) => {
          return (
            <SwiperSlide key={cat?._id}>
              <Link to={"/#"} className="overflow-hidden">
                <div className="item relative text-center p-3 bg-white !rounded-lg !overflow-hidden flex items-center justify-center flex-col">
                  <img
                    src={cat?.images}
                    alt=""
                    className="transition-all !w-[100px] pb-4"
                  />
                  <h3 className="text-center w-full text-[15px] font-medium">
                   {cat?.name}
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default HomeCategorySlider;
