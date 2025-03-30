import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import ProductItem from "../Products/ProductItem";

function ProductsSlider({ data }) {
  return (
    <div className="py-3">
      <Swiper
        slidesPerView={5}
        spaceBetween={5}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {data?.map((product) => {
          return (
            <SwiperSlide key={product?._id} className="!w-[250px] py-3 px-1 h-auto">
              <ProductItem product={product} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default ProductsSlider;
