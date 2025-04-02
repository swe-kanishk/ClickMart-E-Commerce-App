import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

function AdsBannerSlider({ data }) {
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
      {data?.length > 0 &&
        data.map((adBanner) => {
          return (
            <SwiperSlide
              key={adBanner?._id}
              className=" !overflow-hidden !rounded-md"
            >
              <Link
                to={`/productListing?catId=${adBanner?.catId || ""}&subCatId=${
                  adBanner?.subCatId || ""
                }&thirdSubCatId=${adBanner?.thirdSubCatId || ""}`}
              >

                <img className="cursor-pointer !rounded-lg object-cover w-full h-full duration-500 transition-all hover:scale-105 hover:-rotate-1" src={adBanner?.images} alt="" />
              </Link>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}

export default AdsBannerSlider;
