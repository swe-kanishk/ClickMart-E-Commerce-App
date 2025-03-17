// import React, { useRef, useState } from "react";
// import InnerImageZoom from "react-inner-image-zoom";
// import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";

// function ProductZoom({product}) {
//   const [slideIndex, setSlideIndex] = useState(0);
//   const zoomSliderBig = useRef();
//   const zoomSliderSmall = useRef();

//   const goto = (index) => {
//     setSlideIndex(index);
//     zoomSliderBig.current.swiper.slideTo(index);
//     zoomSliderSmall.current.swiper.slideTo(index);
//   };

//   return (
//     <>
//        <div className="flex gap-3">
//         <div className="slider w-[20%]">
//           <Swiper
//             ref={zoomSliderSmall}
//             slidesPerView={5}
//             direction={"vertical"}
//             spaceBetween={20}
//             navigation={true}
//             modules={[Navigation]}
//             className="zoomProductSliderThumbs h-[500px] w-full overflow-hidden"
//           >
//             {images?.length > 0 &&
//               images?.map((img, index) => {
//                 return (
//                   <SwiperSlide key={index}>
//                     <div
//                       className={`item rounded-md overflow-hidden cursor-pointer group ${
//                         slideIndex === index ? "opacity-1" : "opacity-30"
//                       }`}
//                       onClick={() => goto(index)}
//                     >
//                       <img
//                         src={img}
//                         className="h-[100%] w-full object-cover object-center group-hover:scale-110 transition-all"
//                         alt=""
//                       />
//                     </div>
//                   </SwiperSlide>
//                 );
//               })}
//           </Swiper>
//         </div>
//         <div className="zoomContainer w-[80%]">
//           <Swiper
//             ref={zoomSliderBig}
//             slidesPerView={1}
//             spaceBetween={0}
//             navigation={false}
//           >
//             {images?.length > 0 &&
//               images?.map((img, index) => {
//                 return (
//                   <SwiperSlide key={index}>
//                     <InnerImageZoom
//                       zoomType="hover"
//                       src={img}
//                       zoomScale={1}
//                       className="!rounded-md"
//                     />
//                   </SwiperSlide>
//                 );
//               })}
//           </Swiper>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProductZoom;

import React, { useRef, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function ProductZoom({images}) {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderBig = useRef();
  const zoomSliderSmall = useRef();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderBig.current.swiper.slideTo(index);
    zoomSliderSmall.current.swiper.slideTo(index);
  };
  return (
    <>
          <div className="flex gap-3">
            <div className="slider w-[15%]">
              <Swiper
                ref={zoomSliderSmall}
                slidesPerView={5}
                direction={"vertical"}
                spaceBetween={20}
                navigation={true}
                modules={[Navigation]}
                className={`zoomProductSliderThumbs h-[500px] overflow-hidden ${images?.length > 5 && 'space'}`}
              >
                {images?.length > 0 &&
                  images?.map((img, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div
                          className={`item rounded-md overflow-hidden cursor-pointer group ${
                            slideIndex === index ? "opacity-1" : "opacity-30"
                          }`}
                          onClick={() => goto(index)}
                        >
                          <img
                            src={img}
                            className="w-full h-full  object-cover object-center group-hover:scale-110 transition-all"
                            alt=""
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
            <div className="zoomContainer w-[85%] h-[500px] overflow-hidden rounded-md">
              <Swiper
                ref={zoomSliderBig}
                slidesPerView={1}
                spaceBetween={0}
                navigation={false}
              >
                {images?.length > 0 &&
                  images?.map((img, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <InnerImageZoom
                          zoomType="hover"
                          zoomScale={1}
                          src={img}
                        />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
    </>
  );
}

export default ProductZoom;
