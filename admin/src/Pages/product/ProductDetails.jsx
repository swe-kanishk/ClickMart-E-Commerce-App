import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { getData } from "../../utils/api";
import { MdBrandingWatermark, MdFilterVintage } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoMdResize } from "react-icons/io";
import { LiaBalanceScaleSolid } from "react-icons/lia";
import { MdRateReview } from "react-icons/md";
import { BsPatchCheckFill } from "react-icons/bs";
import { Rating } from "@mui/material";
import Box from "@mui/material/Box";
import Ratings from "./Rating&Reviews/Ratings";
import { IoIosStar } from "react-icons/io";
import TextField from "@mui/material/TextField";

function ProductDetails() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [ratingValue, setRatingValue] = useState(70);
  const [product, setProduct] = useState(null);
  const zoomSliderBig = useRef();
  const zoomSliderSmall = useRef();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderBig.current.swiper.slideTo(index);
    zoomSliderSmall.current.swiper.slideTo(index);
  };

  const { id } = useParams();

  useEffect(() => {
    getData(`/api/product/${id}`).then((res) => {
      if (res?.success === true) {
        setProduct(res?.product);
      }
    });
  }, []);
  return (
    <>
      <div className="flex items-center px-2 py-0 mt-3 justify-between">
        <h2 className="text-[20px] font-[600]">Product Details</h2>
      </div>
      <br />
      <div className="product-details flex gap-12">
        <div className="w-[40%]">
          <div className="flex gap-3">
            <div className="slider w-[20%]">
              <Swiper
                ref={zoomSliderSmall}
                slidesPerView={5}
                direction={"vertical"}
                spaceBetween={20}
                navigation={true}
                modules={[Navigation]}
                className="zoomProductSliderThumbs h-[500px] w-full overflow-hidden"
              >
                {product?.images?.length > 0 &&
                  product?.images?.map((img, index) => {
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
                            className="h-[100%] w-full object-cover object-center group-hover:scale-110 transition-all"
                            alt=""
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
            <div className="zoomContainer w-[80%]">
              <Swiper
                ref={zoomSliderBig}
                slidesPerView={1}
                spaceBetween={0}
                navigation={false}
              >
                {product?.images?.length > 0 &&
                  product?.images?.map((img, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <InnerImageZoom
                          zoomType="hover"
                          src={img}
                          zoomScale={1}
                          className="!rounded-md"
                        />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
        </div>
        <div className="w-[60%]">
          <h1 className="text-[25px] font-[500] mb-4">{product?.name}</h1>
          <div className="flex items-center py-1">
            <span className="w-[20%] flex opacity-65 items-center gap-1 text-[15px] font-medium">
              <MdBrandingWatermark />
              Brand :
            </span>
            <span className="text-[15px]">{product?.brand}</span>
          </div>
          <div className="flex items-center py-1">
            <span className="w-[20%] flex opacity-65 items-center gap-1 text-[15px] font-medium">
              <BiSolidCategoryAlt />
              Category :
            </span>
            <span className="text-[15px]">{product?.catName}</span>
          </div>
          {product?.productRam?.length > 0 && (
            <div className="flex items-center py-1">
              <span className="w-[20%] flex opacity-65 items-center gap-1 text-[15px] font-medium">
                <MdFilterVintage />
                RAM :
              </span>
              <div className="flex items-center gap-2">
                {product?.productRam?.map((ram, index) => {
                  return (
                    <span
                      key={index}
                      className="text-[13px] bg-gray-200 py-1 rounded-md font-medium px-2"
                    >
                      {ram}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          {product?.size?.length > 0 && (
            <div className="flex items-center py-1">
              <span className="w-[20%] flex opacity-65 items-center gap-1 text-[15px] font-medium">
                <IoMdResize />
                Size :
              </span>
              <div className="flex items-center gap-2">
                {product?.size?.map((size, index) => {
                  return (
                    <span
                      key={index}
                      className="text-[13px] bg-gray-200 py-1 rounded-md font-medium px-2"
                    >
                      {size}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          {product?.weight?.length > 0 && (
            <div className="flex items-center py-1">
              <span className="w-[20%] flex opacity-65 items-center gap-1 text-[15px] font-medium">
                <LiaBalanceScaleSolid />
                Weight :
              </span>
              <div className="flex items-center gap-2">
                {product?.weight?.map((weight, index) => {
                  return (
                    <span
                      key={index}
                      className="text-[13px] bg-gray-200 py-1 rounded-md font-medium px-2"
                    >
                      {weight}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          <div className="flex items-center py-1">
            <span className="w-[20%] flex opacity-65 items-center gap-1 font-medium">
              <MdRateReview />
              Reviews :
            </span>
            <span>({product?.reviews?.length || 0}) reviews</span>
          </div>
          <div className="flex items-center py-1">
            <span className="w-[20%] flex opacity-65 items-center gap-1 font-medium">
              <BsPatchCheckFill />
              Published :
            </span>
            <span>{product?.createdAt?.split("T")[0]}</span>
          </div>
          <br />
          <h2 className="text-[20px] font-[600]">Product Description</h2>
          <p className="text-[14px] mb-3">{product?.description}</p>
        </div>
      </div>
      <h2 className="text-[20px] font-[600]">Customer Reviews</h2>
      <div
        className={`shadow-md border gap-8 items-start justify-between h-full flex w-full p-5 rounded-md`}
      >
        <div className="w-[50%] pr-5 border-r h-full flex-col flex justify-start items-start">
          <h2 className="mb-4 font-[500] text-[18px]">Overall Rating</h2>
          <div className="flex w-full border-b pb-6 items-start gap-12">
            <Ratings value={ratingValue} />
            <div className="flex flex-col w-full range-container gap-[5px]">
              <div className="flex items-center justify-start gap-3 w-full">
                <p className="flex gap-1 text-[12px] items-start">
                  <span>5</span> <IoIosStar />
                </p>
                <div className="w-full h-[5px] flex items-center bg-gray-200 rounded-md overflow-hidden">
                  <div className={`w-[60%] bg-green-600 h-[3px]`}></div>
                </div>
                <span className="text-[11px] font-medium text-gray-500">
                  2,311
                </span>
              </div>
              <div className="flex items-center justify-start gap-3 w-full">
                <p className="flex gap-1 text-[12px] items-start">
                  <span>4</span> <IoIosStar />
                </p>
                <div className="w-full h-[5px] flex items-center bg-gray-200 rounded-md overflow-hidden">
                  <div className={`w-[51%] bg-green-600 h-[3px]`}></div>
                </div>
                <span className="text-[11px] font-medium text-gray-500">
                  101
                </span>
              </div>
              <div className="flex items-center justify-start gap-3 w-full">
                <p className="flex gap-1 text-[12px] items-start">
                  <span>3</span> <IoIosStar />
                </p>
                <div className="w-full h-[5px] flex items-center bg-gray-200 rounded-md overflow-hidden">
                  <div className={`w-[44%] bg-green-600 h-[3px]`}></div>
                </div>
                <span className="text-[11px] font-medium text-gray-500">
                  1,201
                </span>
              </div>
              <div className="flex items-center justify-start gap-3 w-full">
                <p className="flex gap-1 text-[12px] items-start">
                  <span>2</span> <IoIosStar />
                </p>
                <div className="w-full h-[5px] flex items-center bg-gray-200 rounded-md overflow-hidden">
                  <div className={`w-[20%] bg-orange-400 h-[3px]`}></div>
                </div>
                <span className="text-[11px] font-medium text-gray-500">
                  2,399
                </span>
              </div>
              <div className="flex items-center justify-start gap-3 w-full">
                <p className="flex gap-1 text-[12px] items-start">
                  <span>1</span> <IoIosStar />
                </p>
                <div className="w-full h-[5px] flex items-center bg-gray-200 rounded-md overflow-hidden">
                  <div className={`w-[32%] bg-red-600 h-[3px]`}></div>
                </div>
                <span className="text-[11px] font-medium text-gray-500">
                  234
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[50%]">
          <div className="flex items-center mb-5">
            <p className="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800">
              8.7
            </p>
            <p className="ms-2 font-medium text-gray-900">Excellent</p>
            <span className="w-1 h-1 mx-2 bg-gray-900 rounded-full dark:bg-gray-500"></span>
            <p className="text-sm font-medium text-gray-500">376 reviews</p>
            <Link
              to="/"
              className="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Read all reviews
            </Link>
          </div>
          <article>
            <div className="flex items-center mb-4">
              <img
                className="w-10 h-10 me-4 rounded-full"
                src="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png"
                alt=""
              />
              <div className="font-medium">
                <p>
                  Jese Leos{" "}
                  <time
                    datetime="2014-08-16 19:00"
                    className="block text-sm text-gray-500"
                  >
                    Joined on August 2014
                  </time>
                </p>
              </div>
            </div>
            <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-gray-300 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <h3 className="ms-2 text-sm font-semibold text-gray-900">
                Thinking to buy another one!
              </h3>
            </div>
            <footer className="mb-5 text-sm text-gray-500">
              <p>
                Reviewed in the United Kingdom on{" "}
                <time datetime="2017-03-03 19:00">March 3, 2017</time>
              </p>
            </footer>
            <p className="mb-2 text-gray-500">
              This is my third Invicta Pro Diver. They are just fantastic value
              for money. This one arrived yesterday and the first thing I did
              was set the time, popped on an identical strap from another
              Invicta and went in the shower with it to test the
              waterproofing.... No problems.
            </p>
            <a
              href="#"
              className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Read more
            </a>
            <aside>
              <p className="mt-1 text-xs text-gray-500">
                19 people found this helpful
              </p>
              <div className="flex items-center mt-3">
                <a
                  href="#"
                  className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                >
                  Helpful
                </a>
                <a
                  href="#"
                  className="ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 "
                >
                  Report abuse
                </a>
              </div>
            </aside>
          </article>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
