import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


// import required modules
import { Navigation } from "swiper/modules";
import ProductItem from "../Products/ProductItem";

function ProductsSlider() {
  return (
    <div className="py-3">
      <Swiper
        slidesPerView={6}
        spaceBetween={15}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="!w-[250px] py-3 px-1 h-auto">
          <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="!w-[250px] py-3 px-1 h-auto">
          <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="!w-[250px] py-3 px-1 h-auto">
          <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="!w-[250px] py-3 px-1 h-auto">
          <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="!w-[250px] py-3 px-1 h-auto">
          <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="!w-[250px] py-3 px-1 h-auto">
          <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="!w-[250px] py-3 px-1 h-auto">
          <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="!w-[250px] py-3 px-1 h-auto">
          <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="!w-[250px] py-3 px-1 h-auto">
          <ProductItem />
        </SwiperSlide>
        <SwiperSlide className="!w-[250px] py-3 px-1 h-auto">
          <ProductItem />
        </SwiperSlide>
        
      </Swiper>
    </div>
  );
}

export default ProductsSlider;