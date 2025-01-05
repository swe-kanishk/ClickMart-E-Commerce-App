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
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current.swiper.slideTo(index);
    zoomSliderBig.current.swiper.slideTo(index);
  };
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="slider w-[15%]">
          <Swiper
            ref={zoomSliderSml}
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
              <div
                className="item h-full w-full rounded-md cursor-pointer overflow-hidden group"
                onClick={() => goto(0)}
              >
                <img
                  src="https://www.mgfilmproductions.com/uploads/1/4/5/8/145812880/389783587_4.jpg"
                  alt=""
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="!bg-transparent">
              <div
                className="item h-full w-full rounded-md cursor-pointer overflow-hidden group"
                onClick={() => goto(1)}
              >
                <img
                  src="https://www.mgfilmproductions.com/uploads/1/4/5/8/145812880/389783587_4.jpg"
                  alt=""
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="!bg-transparent">
              <div
                className="item h-full w-full rounded-md cursor-pointer overflow-hidden group"
                onClick={() => goto(2)}
              >
                <img
                  src="https://www.mgfilmproductions.com/uploads/1/4/5/8/145812880/389783587_4.jpg"
                  alt=""
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="!bg-transparent">
              <div
                className="item h-full w-full rounded-md cursor-pointer overflow-hidden group"
                onClick={() => goto(3)}
              >
                <img
                  src="https://www.mgfilmproductions.com/uploads/1/4/5/8/145812880/389783587_4.jpg"
                  alt=""
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide className="!bg-transparent">
              <div
                className="item h-full w-full rounded-md cursor-pointer overflow-hidden group"
                onClick={() => goto(4)}
              >
                <img
                  src="https://www.mgfilmproductions.com/uploads/1/4/5/8/145812880/389783587_4.jpg"
                  alt=""
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="w-[85%] h-[500px] overflow-hidden relative">
          <Swiper
            ref={zoomSliderBig}
            slidesPerView={1}
            spaceBetween={0}
            navigation={false}
            className="zoomSwiper"
          >
            <SwiperSlide>
              <div className="w-full h-[500px]">
              <InnerImageZoom
                src="https://www.mgfilmproductions.com/uploads/1/4/5/8/145812880/389783587_4.jpg"
                zoomScale={1.5}
                zoomType="hover"
                zoomPreload={true}
              />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default ProductZoom;
