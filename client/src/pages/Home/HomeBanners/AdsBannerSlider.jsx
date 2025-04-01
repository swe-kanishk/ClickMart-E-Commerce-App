import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

function AdsBannerSlider({ data }) {
  return (
    <Swiper
      slidesPerView={3}
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
              className="!w-2/6 py-3 px-1 h-auto"
            >
              <Link
                to={`/productListing?catId=${adBanner?.catId || ""}&subCatId=${
                  adBanner?.subCatId || ""
                }&thirdSubCatId=${adBanner?.thirdSubCatId || ""}`}
              >
                <img className="cursor-pointer" src={adBanner?.images} alt="" />
              </Link>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}

export default AdsBannerSlider;
