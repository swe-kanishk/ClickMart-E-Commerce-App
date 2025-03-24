import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

function AdsBannerSlider({ adBanner }) {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={15}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation]}
      className="mySwiper"
    >
      <SwiperSlide key={adBanner?._id} className="!w-1/4 py-3 px-1 h-auto">
        <img
          src="https://serviceapi.spicezgold.com/download/1741669037986_banner2.webp"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide key={adBanner?._id} className="!w-1/4 py-3 px-1 h-auto">
        <img
          src="https://serviceapi.spicezgold.com/download/1741669037986_banner2.webp"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide key={adBanner?._id} className="!w-1/4 py-3 px-1 h-auto">
        <img
          src="https://serviceapi.spicezgold.com/download/1741669037986_banner2.webp"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide key={adBanner?._id} className="!w-1/4 py-3 px-1 h-auto">
        <img
          src="https://serviceapi.spicezgold.com/download/1741669037986_banner2.webp"
          alt=""
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default AdsBannerSlider;
