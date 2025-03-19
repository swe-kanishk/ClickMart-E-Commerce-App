import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./../style.css";

// import required modules
import { EffectFade, Navigation, Autoplay, Pagination } from "swiper/modules";
import { Button } from "@mui/material";
import HomeBannerSliderSkelton from "./HomeBannerSliderSkelton";
import { useEffect } from "react";

function HomeSlider({ productsData }) {
  const navigate = useNavigate();
  const [productsBanner, setProductsBanner] = useState([]);

  useEffect(() => {
    const filteredBannerProducts = productsData?.filter(
      (product) => product?.isDisplayOnHomeBanner === true
    );
    setProductsBanner(filteredBannerProducts);
  }, []);

  return productsBanner?.length > 0 ? (
    <Swiper
      loop={true}
      spaceBetween={30}
      effect={"fade"}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      autoplay={{}}
      modules={[Navigation, EffectFade, Autoplay, Pagination]}
      className="homeSlider"
    >
      {productsData
        ?.filter((product) => product?.isDisplayOnHomeBanner === true)
        .map((product) => {
          return (
            <SwiperSlide>
              <div className="item w-full rounded-md overflow-hidden relative">
                <img
                  src="https://demos.codezeel.com/prestashop/PRS21/PRS210502/modules/cz_imageslider/views/img/sample-1.jpg"
                  alt=""
                />
                <div className="info absolute top-0 right-[-100%] opacity-0 transition-all duration-700 w-[45%] text-start h-[100%] flex items-start justify-center flex-col z-50 p-8">
                  <h4 className="text-[18px] right-[-100%] opacity-0 duration-[2s] relative font-[500]">
                    {product?.bannerTitle}
                  </h4>
                  <h2 className="text-[30px] right-[-100%] opacity-0 duration-[1.5s] relative font-[700]">
                    {product?.bannerDescription}
                  </h2>
                  <h3 className="text-[18px] right-[-100%] opacity-0 duration-[1s] relative flex items-center gap-3 font-[500] w-full text-left my-3">
                    Starting At Only{" "}
                    <span className="text-[30px] font-[700] text-red-500">
                      &#8377;{product?.price}
                    </span>
                  </h3>
                  <Button
                    onClick={() => navigate(`/productDetails/${product?._id}`)}
                    className="!text-white btn right-[-100%] opacity-0 duration-[2200ms] relative !bg-red-500"
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  ) : (
    <HomeBannerSliderSkelton animate={false} />
  );
}

export default HomeSlider;
