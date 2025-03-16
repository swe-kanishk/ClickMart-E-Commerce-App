import React, { useContext, useEffect, useState } from "react";
import HomeSlider from "./HomeSlider";
import HomeCategorySlider from "./HomeCategorySlider/HomeCategorySlider";
import { FaShippingFast } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./style.css";
// import required modules
import { Navigation } from "swiper/modules";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProductsSlider from "./products/ProductsSlider";
import BlogItem from "../BlogItem";
import HomeBanner from "./HomeBanner";
import { MyContext } from "../../App";
import { getData } from "../../utils/api";

function Home() {
  const [value, setValue] = useState(0);
  const [productsData, setProductsData] = useState([]);
  const [popularProductsData, setPopularProductsData] = useState([]);

  const context = useContext(MyContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getData(
      `/api/product/getAllProductsByCatId/${context?.categoryData[0]?._id}`
    ).then((res) => {
      console.log(res)
      if (res?.success === true) {
        setPopularProductsData(res?.data);
      }
    });
  }, [context?.categoryData]);

  const filterProductsByCat = (id) => {
    getData(`/api/product/getAllProductsByCatId/${id}`).then((res) => {
      if (res?.success === true) {
        setPopularProductsData(res?.data);
      }
    });
  };

  return (
    <>
      <section className="py-6">
        <div className="container flex gap-2 justify-between">
          <div className="part-1 w-[75%] flex flex-col">
            <HomeSlider />
          </div>
          <div className="part-2 w-[25%] flex flex-col">
            <HomeBanner />
          </div>
        </div>
      </section>
      {context?.categoryData?.length > 0 && <HomeCategorySlider />}
      <section className="bg-white py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="left-section">
              <h3 className="text-[20px] font-[600]">Popular Products</h3>
              <p className="text-[14px] font-[400]">
                Don't miss the current offers until the end of this month.
              </p>
            </div>
            {context?.categoryData?.length > 0 && (
              <div className="right-section w-[60%]">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  {context?.categoryData?.map((cat) => {
                    return (
                      <Tab
                        key={cat?._id}
                        label={cat?.name}
                        onClick={() => filterProductsByCat(cat?._id)}
                      />
                    );
                  })}
                </Tabs>
              </div>
            )}
          </div>
          {    
            popularProductsData?.length > 0 && <ProductsSlider data={popularProductsData} />
          }
        </div>
      </section>
      <section className="py-5 bg-white">
        <div className="container">
          <div className="freeShipping w-[80%] mx-auto p-6 border-2 border-[#1876D2] flex items-center justify-between">
            <div className="items-center flex gap-3 w-1/5 border-gray-300 border-r-2">
              <FaShippingFast className="scale-x-[-1] text-2xl text-gray-600" />
              <span className="text-xl font-semibold text-gray-600">
                Free Shipping
              </span>
            </div>
            <div className="items-center flex w-3/5 justify-center border-gray-300 border-r-2">
              <span className="text-gray-800">
                Free Delivery Now On Your First Order and over $200
              </span>
            </div>
            <div className="items-center justify-end flex w-1/5">
              <span className="text-xl font-semibold">- Only $200*</span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-[600]">Latest Products</h2>
          <ProductsSlider />
        </div>
      </section>
      <section className="py-5 pt-0 bg-white">
        <div className="container">
          <h2 className="text-[20px] font-[600]">Featured Products</h2>
          <ProductsSlider />
        </div>
      </section>
      <section className="pb-8 pt-0 bg-white blogSection">
        <div className="container">
          <h2 className="text-[20px] font-[600] mb-4">From the Blog</h2>
          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[Navigation]}
            className="blogSlider"
          >
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
}

export default Home;
