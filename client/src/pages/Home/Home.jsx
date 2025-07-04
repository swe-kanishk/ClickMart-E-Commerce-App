import React, { useContext, useEffect, useState } from "react";
import HomeSlider from "./HomeBanners/HomeSlider";
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
import ProductsSlider from "./Products/ProductsSlider";
import BlogItem from "../BlogItem";
import HomeBanner from "./HomeBanners/HomeBanner";
import { MyContext } from "../../App";
import { getData } from "../../utils/api";
import ProductSkelton from "./Products/ProductSkelton";
import HomeBannerSliderSkelton from "./HomeBanners/HomeBannerSliderSkelton";
import AdsBannerSlider from "./HomeBanners/AdsBannerSlider";

function Home() {
  const [value, setValue] = useState(0);
  const [productsData, setProductsData] = useState([]);
  const [featuredProductsData, setFeaturedProductsData] = useState([]);
  const [popularProductsData, setPopularProductsData] = useState([]);
  const [blogsData, setBlogsData] = useState([]);
  const [bannersV1Data, setBannersV1Data] = useState([]);
  const [adsBannerData, setAdsBannersData] = useState([]);

  const context = useContext(MyContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getData(
      `/api/product/getAllProductsByCatId/${context?.categoryData[0]?._id}`
    ).then((res) => {
      if (res?.success === true) {
        setPopularProductsData(res?.data);
      }
    });
  }, [context?.categoryData]);

  useEffect(() => {
    getData(`/api/product/`).then((res) => {
      if (res?.success === true) {
        setProductsData(res?.data);
      }
    });
    getData(`/api/product/getFeaturedProducts`).then((res) => {
      if (res?.success === true) {
        setFeaturedProductsData(res?.featuredProducts);
      }
    });
    getData(`/api/blogs/`).then((res) => {
      if (res?.success === true) {
        setBlogsData(res?.blogs);
      }
    });
    getData(`/api/bannerV1/`).then((res) => {
      if (res?.success === true) {
        setBannersV1Data(res?.banners);
      }
    });
    getData(`/api/adsBanner`).then((res) => {
      if (res?.success === true) {
        setAdsBannersData(res?.banners);
      }
    });
  }, []);

  const filterProductsByCat = (id) => {
    setPopularProductsData([]);
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
          <div className="part-1 w-[75%]">
            {productsData?.length > 0 ? (
              <HomeSlider productsData={productsData} />
            ) : (
              <HomeBannerSliderSkelton animate={true} />
            )}
          </div>
          {bannersV1Data?.length > 0 && (
            <div className="part-2 w-[25%] gap-3 overflow-hidden flex flex-col">
              {bannersV1Data?.slice(0, 2).map((banner) => {
                return <HomeBanner banner={banner} />;
              })}
            </div>
          )}
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
          {popularProductsData?.length > 0 ? (
            <ProductsSlider data={popularProductsData} />
          ) : (
            <ProductSkelton length={6} />
          )}
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
      {productsData?.length > 0 ? (
        <section className="py-5 pt-0 bg-white">
          <div className="container">
            <h2 className="text-[20px] font-[600]">Latest Products</h2>
            <ProductsSlider data={productsData} />
          </div>
        </section>
      ) : (
        <ProductSkelton length={6} />
      )}

      {featuredProductsData?.length > 0 ? (
        <section className="py-5 pt-0 bg-white">
          <div className="container">
            <h2 className="text-[20px] font-[600]">Featured Products</h2>
            <ProductsSlider data={featuredProductsData} />
          </div>
        </section>
      ) : (
        <ProductSkelton length={6} />
      )}

      {adsBannerData?.length > 0 && (
        <section className="pb-8 pt-0 bg-white blogSection">
          <div className="container">
            <AdsBannerSlider data={adsBannerData} />
          </div>
        </section>
      )}

      {blogsData?.length > 0 && (
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
              {blogsData?.map((blog) => {
                return (
                  <SwiperSlide key={blog?._id}>
                    <BlogItem blog={blog} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </section>
      )}
    </>
  );
}

export default Home;
