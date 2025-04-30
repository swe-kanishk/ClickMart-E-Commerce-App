import { Breadcrumbs, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductZoom from "../../components/ProductZoom";

import { Rating } from "@mui/material";
import Ratings from "./Rating&Reviews/Ratings";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { IoIosStar } from "react-icons/io";
import ProductDetailsContent from "../../components/ProductDetailsContent";
import { getData, postData } from "../../utils/api";
import { BiLoader } from "react-icons/bi";
import { MdOutlineRateReview } from "react-icons/md";
import toast from "react-hot-toast";
import ProductsSlider from "../Home/Products/ProductsSlider";

function ProductDetails() {
  const [activeTab, setActiveTab] = useState(1);
  const [ratingValue, setRatingValue] = useState(70);
  const [productData, setProductData] = useState(null);
  const [relatedProductsData, setRelatedProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const reviewSectionRef = useRef(null);

  const { id } = useParams();

  const [formFields, setFormFields] = useState({
    rating: 4,
    title: "",
    review: "",
    productId: id,
  });

  useEffect(() => {
    setIsLoading(true);
    getData(`/api/product/${id}`)
      .then((res) => {
        if (res?.success === true) {
          setProductData(res?.product);
          getData(
            `/api/product/getAllProductsBySubCatId/${res?.product?.subCatId}`
          ).then((res) => {
            console.log(res);
            if (res?.success === true) {
              const filteredData = res?.data?.filter(
                (product) => product?._id !== id
              );
              setRelatedProductsData(filteredData);
            }
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    scrollTo(0, 0);
  }, [id]);

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formFields.rating === "" ||
      formFields.rating === 0 ||
      formFields.rating === null ||
      formFields.rating === undefined
    ) {
      toast.error("Please rate the product!");
      return;
    } else if (formFields.title === "") {
      toast.error("Please enter review title!");
      return;
    } else if (formFields.review === "") {
      toast.error("Please enter review!");
      return;
    }
    console.log(formFields);
    setIsLoading(true);
    postData("/api/user/addReview", formFields, { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (res?.success === true) {
          toast.success(res?.message);
          setFormFields({
            rating: 4,
            title: "",
            review: "",
            productId: id,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
            <ProductDetailsContent
              reviewSectionRef={reviewSectionRef}
              productData={productData}
            />
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
              ref={reviewSectionRef}
              onClick={() => setActiveTab(2)}
              className={`link text-[18px] cursor-pointer px-2 rounded-[4px] py-[3px] text-[500] ${
                activeTab === 3 && "bg-primary hover:!text-white text-white"
              }`}
            >
              Reviews ({productData?.reviews?.length || 0})
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
                <form
                  onSubmit={handleSubmit}
                  className="flex bg-gray-100 rounded-lg pb-4 p-3 flex-col gap-2 w-full mt-5"
                >
                  <h2 className="my-4 font-[500] text-[18px]">
                    Share Your Review and Provide a Rating
                  </h2>
                  <Box
                    sx={{ "& > legend": { mt: 2 } }}
                    className="flex items-center gap-4 mb-3"
                  >
                    <span className="text-sm text-gray-600">
                      Rate this Product:
                    </span>
                    <Rating
                      name="rating"
                      value={formFields.rating}
                      disabled={isLoading}
                      onChange={handleOnChangeInput}
                    />
                    <span className="text-sm text-gray-600 text-center">
                      ({formFields?.rating})
                    </span>
                  </Box>
                  <input
                    onChange={handleOnChangeInput}
                    value={formFields.title}
                    placeholder="Title of your review"
                    name="title"
                    disabled={isLoading}
                    type="text"
                    className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
                  />
                  <TextField
                    id="review-input"
                    label="Your Review"
                    multiline
                    value={formFields.review}
                    onChange={handleOnChangeInput}
                    maxRows={4}
                    name="review"
                    disabled={isLoading}
                    variant="standard"
                    className="w-full !px-3 !mt-3 !bg-white"
                  />
                  <hr />
                  <br />
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className={`${
                      isLoading ? "!bg-blue-500" : "!bg-blue-600"
                    } mt-3 !text-white !capitalize !max-w-full !w-full !p-2 !text-center !font-[500] gap-1`}
                  >
                    {isLoading ? (
                      <BiLoader size={"22px"} className="animate-spin" />
                    ) : (
                      <>
                        <MdOutlineRateReview size={"20px"} className="mb-1" />{" "}
                        Add Review
                      </>
                    )}
                  </Button>
                </form>
              </div>

              <div className="w-[40%]">
                <div className="flex items-center mb-5">
                  <p className="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800">
                    8.7
                  </p>
                  <p className="ms-2 font-medium text-gray-900">Excellent</p>
                  <span className="w-1 h-1 mx-2 bg-gray-900 rounded-full dark:bg-gray-500"></span>
                  <p className="text-sm font-medium text-gray-500">
                    {productData?.reviews?.length} reviews
                  </p>
                  <Link
                    to="/"
                    className="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Read all reviews
                  </Link>
                </div>
                {productData?.reviews?.length > 0 &&
                  productData?.reviews?.map((review, index) => {
                    return (
                      <article key={review?._id}>
                        <div className="flex items-center gap-2 mb-4">
                          <img
                            className="w-10 h-10 object-cover rounded-full"
                            src={
                              review?.user?.avatar ||
                              "https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png"
                            }
                            alt=""
                          />
                          <div className="font-medium">
                            <p>
                              {review?.user?.fullName}{" "}
                              <time
                                datetime="2014-08-16 19:00"
                                className="block text-sm text-gray-500"
                              >
                                Joined on{" "}
                                {review?.user?.createdAt?.split("T")[0]}
                              </time>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                          {[...Array(5)].map((_, index) => (
                            <svg
                              className={`w-4 h-4 ${
                                index < review?.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 22 20"
                            >
                              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                          ))}
                          <h3 className="ms-2 text-sm font-semibold text-gray-900">
                            {review?.title}
                          </h3>
                        </div>
                        <footer className="mb-5 text-sm text-gray-500">
                          <p>Reviewed on {review?.createdAt?.split("T")[0]}</p>
                        </footer>
                        <p className="mb-2 text-gray-500 whitespace-pre-wrap">
                          {review?.review?.substring(0, 200)}...
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
                          </div>
                        </aside>
                      </article>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
        {relatedProductsData?.length > 0 && (
          <div className="container">
            <hr className="my-8" />
            <h2 className="text-[20px] font-[600]">Related Products</h2>
            <ProductsSlider data={relatedProductsData} />
          </div>
        )}
      </section>
    </>
  );
}

export default ProductDetails;
