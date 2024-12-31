import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./style.css";

// import required modules
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

function HomeCategorySlider() {
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
        <SwiperSlide>
          <Link to={'/#'} className="overflow-hidden">
          <div className="item relative text-center p-3 bg-white !rounded-lg !overflow-hidden flex items-center justify-center flex-col">
            <img
              src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/12-cz_categoryimagelist.jpg"
              alt=""
              className="transition-all"
            />
            <h3 className="absolute bottom-3 text-center w-full left-0 text-[15px] font-medium">Crepe T-Shirt</h3>
          </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
        <Link to={'/#'} className="overflow-hidden">
          <div className="item p-3 bg-white !rounded-lg !overflow-hidden">
            <img
              src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/11-cz_categoryimagelist.jpg"
              alt=""
              className="transition-all"
            />
            <h3 className="absolute bottom-3 text-center w-full left-0 text-[15px] font-medium">Smart Tablet</h3>
          </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={'/#'} className="overflow-hidden">
          <div className="item relative text-center p-3 bg-white !rounded-lg !overflow-hidden flex items-center justify-center flex-col">
            <img
              src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/12-cz_categoryimagelist.jpg"
              alt=""
              className="transition-all"
            />
            <h3 className="absolute bottom-3 text-center w-full left-0 text-[15px] font-medium">Crepe T-Shirt</h3>
          </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
        <Link to={'/#'} className="overflow-hidden">
          <div className="item p-3 bg-white !rounded-lg !overflow-hidden">
            <img
              src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/11-cz_categoryimagelist.jpg"
              alt=""
              className="transition-all"
            />
            <h3 className="absolute bottom-3 text-center w-full left-0 text-[15px] font-medium">Smart Tablet</h3>
          </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={'/#'} className="overflow-hidden">
          <div className="item relative text-center p-3 bg-white !rounded-lg !overflow-hidden flex items-center justify-center flex-col">
            <img
              src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/12-cz_categoryimagelist.jpg"
              alt=""
              className="transition-all"
            />
            <h3 className="absolute bottom-3 text-center w-full left-0 text-[15px] font-medium">Crepe T-Shirt</h3>
          </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
        <Link to={'/#'} className="overflow-hidden">
          <div className="item p-3 bg-white !rounded-lg !overflow-hidden">
            <img
              src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/11-cz_categoryimagelist.jpg"
              alt=""
              className="transition-all"
            />
            <h3 className="absolute bottom-3 text-center w-full left-0 text-[15px] font-medium">Smart Tablet</h3>
          </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={'/#'} className="overflow-hidden">
          <div className="item relative text-center p-3 bg-white !rounded-lg !overflow-hidden flex items-center justify-center flex-col">
            <img
              src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/12-cz_categoryimagelist.jpg"
              alt=""
              className="transition-all"
            />
            <h3 className="absolute bottom-3 text-center w-full left-0 text-[15px] font-medium">Crepe T-Shirt</h3>
          </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
        <Link to={'/#'} className="overflow-hidden">
          <div className="item p-3 bg-white !rounded-lg !overflow-hidden">
            <img
              src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/11-cz_categoryimagelist.jpg"
              alt=""
              className="transition-all"
            />
            <h3 className="absolute bottom-3 text-center w-full left-0 text-[15px] font-medium">Smart Tablet</h3>
          </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={'/#'} className="overflow-hidden">
          <div className="item relative text-center p-3 bg-white !rounded-lg !overflow-hidden flex items-center justify-center flex-col">
            <img
              src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/12-cz_categoryimagelist.jpg"
              alt=""
              className="transition-all"
            />
            <h3 className="absolute bottom-3 text-center w-full left-0 text-[15px] font-medium">Crepe T-Shirt</h3>
          </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
        <Link to={'/#'} className="overflow-hidden">
          <div className="item p-3 bg-white !rounded-lg !overflow-hidden">
            <img
              src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/11-cz_categoryimagelist.jpg"
              alt=""
              className="transition-all"
            />
            <h3 className="absolute bottom-3 text-center w-full left-0 text-[15px] font-medium">Smart Tablet</h3>
          </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={'/#'} className="overflow-hidden">
          <div className="item relative text-center p-3 bg-white !rounded-lg !overflow-hidden flex items-center justify-center flex-col">
            <img
              src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/12-cz_categoryimagelist.jpg"
              alt=""
              className="transition-all"
            />
            <h3 className="absolute bottom-3 text-center w-full left-0 text-[15px] font-medium">Crepe T-Shirt</h3>
          </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
        <Link to={'/#'} className="overflow-hidden">
          <div className="item p-3 bg-white !rounded-lg !overflow-hidden">
            <img
              src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/11-cz_categoryimagelist.jpg"
              alt=""
              className="transition-all"
            />
            <h3 className="absolute bottom-3 text-center w-full left-0 text-[15px] font-medium">Smart Tablet</h3>
          </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={'/#'} className="overflow-hidden">
          <div className="item relative text-center p-3 bg-white !rounded-lg !overflow-hidden flex items-center justify-center flex-col">
            <img
              src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/12-cz_categoryimagelist.jpg"
              alt=""
            />
            <h3 className="absolute bottom-3 text-center w-full left-0 text-[15px] font-medium">Crepe T-Shirt</h3>
          </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
        <Link to={'/#'} className="overflow-hidden">
          <div className="item p-3 bg-white !rounded-lg !overflow-hidden">
            <img
              src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_categoryimagelist/views/img/11-cz_categoryimagelist.jpg"
              alt=""
            />
            <h3 className="absolute bottom-3 text-center w-full left-0 text-[15px] font-medium">Smart Tablet</h3>
          </div>
          </Link>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default HomeCategorySlider;
