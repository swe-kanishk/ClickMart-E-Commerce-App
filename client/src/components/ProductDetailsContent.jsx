import React, { useContext, useState } from "react";
import { IoIosGitCompare, IoMdHeartEmpty, IoMdCart } from "react-icons/io";
import { Button, Rating } from "@mui/material";
import QtyBox from "./QtyBox";
import { MyContext } from "../App";
import toast from "react-hot-toast";
import { BiLoader } from "react-icons/bi";

function ProductDetailsContent({ productData, reviewSectionRef }) {
    const [showTabValue, setShowTabValue] = useState(null);
    const [activeTab, setActiveTab] = useState(null);
    const [qty, setQty] = useState(1);
    const [isLoading, setIsLoading] = useState(false)

  const context = useContext(MyContext)

  const gotoReviews = () => {
    window.scrollTo({
      top: reviewSectionRef?.current?.offsetTop-100,
      behavior: "smooth",
    });
    setActiveTab(2)
  }

  const addItemToCart = () => {
    if(productData?.size?.length !== 0 && !showTabValue) {
      toast.error('Please select item size!');
      return
    }
    if(productData?.productRam?.length !== 0 && !showTabValue) {
      toast.error('Please select item ram!');
      return
    }
    if(productData?.weight?.length !== 0 && !showTabValue) {
      toast.error('Please select item weight!');
      return
    }

    setIsLoading(true)

    const cartProductData = {
      productId: productData?._id,
      productTitle: productData?.name,
      image: productData?.images?.[0],
      quantity: qty,
      countInStock: productData?.countInStock,
      subTotal: parseInt(productData?.price) * qty,
      rating: productData?.rating?.[0] || 1,
      price: productData?.price,
      oldPrice: productData?.oldPrice,
      discount: productData?.discount,
      productSize: productData?.size?.length > 0 ? showTabValue : '',
      productRAM: productData?.productRam?.length > 0 ? showTabValue : '',
      productWeight: productData?.weight?.length > 0 ? showTabValue : '',
      brand: productData?.brand,
      productRAMData: productData?.productRam,
      productSizeData: productData?.size,
      productWeightData: productData?.weight
    };
    context?.addToCart(cartProductData);
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  };

  const handleClickActiveTab = (index, value) => { 
    setShowTabValue(value)
    setActiveTab(index);
  };
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-gray-600">
          Brands:{" "}
          <span className="font-[500] text-black opacity-80 text-[14px]">
            {productData?.brand}
          </span>
        </span>
        <Rating
          name="size-rating"
          size="small"
          defaultValue={productData?.rating}
          readOnly
        />
        <span onClick={gotoReviews} className="text-[13px] cursor-pointer text-gray-600">
          Review ({productData?.reviews?.length || 0})
        </span>
      </div>
      <h1 className="text-[24px] font-[600] mb-1">{productData?.name}</h1>
      <p className="text-gray-600 text-sm">{productData?.description}</p>
      <div className="flex items-center gap-4 mb-2 mt-3">
        <span className="oldPrice line-through text-gray-500 text-[18px] font-[500]">
          &#8377;{productData?.oldPrice}
        </span>
        <span className="price text-primary text-[18px] font-[600]">
          &#8377;{productData?.price}
        </span>
      </div>
      <hr />
      <div className="mt-3">
        <span className="text-[14px]">
          Available In Stock:{" "}
          <span className="text-green-700 font-semibold">
            {productData?.countInStock} Items
          </span>
        </span>
        <div className="flex flex-col items-start justify-center">
          {productData?.size?.length > 0 && (
            <div className="flex items-center gap-2 size-btns my-3">
              <span className="font-semibold">Size:</span>
              {productData?.size?.map((n, index) => {
                return (
                  <Button
                    onClick={() => handleClickActiveTab(index, n)}
                    className={`${activeTab === index && "active-size"}`}
                  >
                    {n}
                  </Button>
                );
              })}
            </div>
          )}
          {productData?.weight?.length > 0 && (
            <div className="flex items-center gap-2 size-btns my-3">
              <span className="font-semibold">Size:</span>
              {productData?.weight?.map((n, index) => {
                return (
                  <Button
                    onClick={() => handleClickActiveTab(index, n)}
                    className={`${activeTab === index && "active-size"}`}
                  >
                    {n}
                  </Button>
                );
              })}
            </div>
          )}
          {productData?.productRam?.length > 0 && (
            <div className="flex items-center gap-2 size-btns my-3">
              <span className="font-semibold">Size:</span>
              {productData?.productRam?.map((n, index) => {
                return (
                  <Button
                    onClick={() => handleClickActiveTab(index, n)}
                    className={`${activeTab === index && "active-size"}`}
                  >
                    {n}
                  </Button>
                );
              })}
            </div>
          )}
          <p className="text-[14px] font-medium mb-3 text-red-500">
            Free Delivery (Est. Delivery Time 3-5 Days)
          </p>
          <div className="flex items-center gap-4">
            <div className="w-[80px]">
              <QtyBox qty={qty} setQty={setQty} />
            </div>
            <Button disabled={isLoading} onClick={addItemToCart} className="flex gap-1 !capitalize hover:!bg-black !bg-primary !text-white">
              {" "}
              {
                isLoading ? <BiLoader size={22} className="min-w-[100px] animate-spin"/> : <><IoMdCart size={"20px"} className="" /> Add to Cart</>
              }
              
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <span className="text-gray-500 text-[14px] hover:text-black group hover:underline transition-all duration-500 cursor-pointer underline-offset-2 flex gap-1 items-center">
            <IoMdHeartEmpty
              size={"18px"}
              className="text-gray-600 group-hover:text-[#f84e8f]"
            />{" "}
            Add to Wishlist
          </span>
          <span className="text-gray-500 text-[14px] hover:text-black group hover:underline transition-all duration-500 cursor-pointer underline-offset-2 flex gap-1 items-center">
            <IoIosGitCompare
              size={"18px"}
              className="text-gray-600 group-hover:text-[#945aff]"
            />{" "}
            Add to Compare
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsContent;
