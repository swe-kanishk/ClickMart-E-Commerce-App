import { Breadcrumbs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductZoom from "../../components/ProductZoom";

import { Rating } from "@mui/material";
import Ratings from "./Rating&Reviews/Ratings";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { IoIosStar } from "react-icons/io";
import ProductDetailsContent from "../../components/ProductDetailsContent";
import { getData } from "../../utils/api";

function ProductDetails() {
  const [activeTab, setActiveTab] = useState(1);
  const [ratingValue, setRatingValue] = useState(70);
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getData(`/api/product/${id}`)
      .then((res) => {
        if (res?.success === true) {
          setProductData(res?.product);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return (
    <>
      <div className="py-5">
        <div className="container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              className="link transition"
              color="inherit"
              href="/"
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link transition"
            >
              Fashion
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link transition"
            >
              Female Black Top and Plazo
            </Link>
          </Breadcrumbs>
        </div>
      </div>
      <section className="py-5 bg-white">
        <div className="container flex gap-8">
          <div className="productZoomContainer w-[40%]">
            <ProductZoom images={productData?.images} />
          </div>
          <div className="productContent w-[60%] pr-10">
            <ProductDetailsContent productData={productData} />
          </div>
        </div>
        <div className="container pt-10">
          <div className="flex items-center gap-5 mb-5">
            <span
              onClick={() => setActiveTab(1)}
              className={`link text-[18px] cursor-pointer px-2 rounded-[4px] py-[3px] text-[500] ${
                activeTab === 1 && "bg-primary hover:!text-white text-white"
              }`}
            >
              Description
            </span>
            <span
              onClick={() => setActiveTab(2)}
              className={`link text-[18px] cursor-pointer px-2 rounded-[4px] py-[3px] text-[500] ${
                activeTab === 3 && "bg-primary hover:!text-white text-white"
              }`}
            >
              Reviews (5)
            </span>
          </div>
          {activeTab === 1 && (
            <div className={`shadow-md border w-full p-5 rounded-md`}>
              <p className="text-[14px] text-gray-500 mb-3">
                {productData?.description}
              </p>
            </div>
          )}
         
          {activeTab === 2 && (
            <div
              className={`shadow-md border gap-8 items-start justify-between h-full flex w-full p-5 rounded-md`}
            >
              <div className="w-[55%] pr-5 border-r h-full flex-col flex justify-start items-start">
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
                <div className="flex flex-col w-full mt-5">
                  <h2 className="my-4 font-[500] text-[18px]">
                    Share Your Review and Provide a Rating
                  </h2>
                  <Box
                    sx={{ "& > legend": { mt: 2 } }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-sm text-gray-600">
                      Rate this Product:
                    </span>
                    <Rating
                      name="simple-controlled"
                      value={ratingValue}
                      onChange={(event, newValue) => {
                        setRatingValue(newValue);
                      }}
                    />
                    <span className="text-sm text-gray-600 text-center">
                      ({ratingValue})
                    </span>
                  </Box>
                  <TextField
                    id="standard-multiline-flexible"
                    label="Your Review"
                    multiline
                    maxRows={4}
                    variant="standard"
                    className="w-full !mt-3"
                  />
                </div>
              </div>

              <div className="w-[40%]">
                <div className="flex items-center mb-5">
                  <p className="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800">
                    8.7
                  </p>
                  <p className="ms-2 font-medium text-gray-900">Excellent</p>
                  <span className="w-1 h-1 mx-2 bg-gray-900 rounded-full dark:bg-gray-500"></span>
                  <p className="text-sm font-medium text-gray-500">
                    376 reviews
                  </p>
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
                    This is my third Invicta Pro Diver. They are just fantastic
                    value for money. This one arrived yesterday and the first
                    thing I did was set the time, popped on an identical strap
                    from another Invicta and went in the shower with it to test
                    the waterproofing.... No problems.
                  </p>
                  <p className="mb-3 text-gray-500">
                    It is obviously not the same build quality as those very
                    expensive watches. But that is like comparing a Citroën to a
                    Ferrari. This watch was well under £100! An absolute
                    bargain.
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
          )}
        </div>
        <hr className="mt-12" />
        <div className="container pt-10">
          <h2 className="text-[20px] font-[600]">Related Products</h2>
          {/* <ProductsSlider /> */}
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
