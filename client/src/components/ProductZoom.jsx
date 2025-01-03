import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import InnerImageZoom from "react-inner-image-zoom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";


// import required modules
import { Navigation } from "swiper/modules";

function ProductZoom() {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="slider w-[15%]">
          <Swiper
            slidesPerView={4}
            direction={"vertical"}
            spaceBetween={10}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[Navigation]}
            className="zoomProductSlider"
          >
            <SwiperSlide className="!bg-transparent">
              <div className="item h-full w-full overflow-hidden">
                <img
                  src="https://www.mgfilmproductions.com/uploads/1/4/5/8/145812880/389783587_4.jpg"
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="!bg-transparent">
              <div className="item h-full w-full overflow-hidden">
                <img
                  src="https://www.mgfilmproductions.com/uploads/1/4/5/8/145812880/389783587_4.jpg"
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="!bg-transparent">
              <div className="item h-full w-full overflow-hidden">
                <img
                  src="https://www.mgfilmproductions.com/uploads/1/4/5/8/145812880/389783587_4.jpg"
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="!bg-transparent">
              <div className="item h-full w-full overflow-hidden">
                <img
                  src="https://www.mgfilmproductions.com/uploads/1/4/5/8/145812880/389783587_4.jpg"
                  alt=""
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="!bg-transparent">
              <div className="item h-full w-full overflow-hidden">
                <img
                  src="https://www.mgfilmproductions.com/uploads/1/4/5/8/145812880/389783587_4.jpg"
                  alt=""
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="w-[85%]">
          <InnerImageZoom
            src="https://www.mgfilmproductions.com/uploads/1/4/5/8/145812880/389783587_4.jpg"
            zoomScale={1}
            zoomType="hover"
          />
        </div>
      </div>
    </>
  );
}

export default ProductZoom;
