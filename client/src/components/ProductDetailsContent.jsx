import React, { useContext, useState } from "react";
import { IoIosGitCompare, IoMdHeartEmpty, IoMdCart } from "react-icons/io";
import { Button, Rating } from "@mui/material";
import QtyBox from "./QtyBox";
import { MyContext } from "../App";

function ProductDetailsContent({ product }) {
  const [activeProductSize, setActiveProductSize] = useState("S");

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-gray-600">
          Brands:{" "}
          <span className="font-[500] text-black opacity-80 text-[14px]">
            {product?.brand}
          </span>
        </span>
        <Rating
          name="size-rating"
          size="small"
          defaultValue={product?.rating}
          readOnly
        />
        <span className="text-[13px] cursor-pointer text-gray-600">
          Review (5)
        </span>
      </div>
      <h1 className="text-[24px] font-[600] mb-1">{product?.name}</h1>
      <p className="text-gray-600 text-sm">{product?.description}</p>
      <div className="flex items-center gap-4 mb-2 mt-3">
        <span className="oldPrice line-through text-gray-500 text-[18px] font-[500]">
          &#8377;{product?.oldPrice}
        </span>
        <span className="price text-primary text-[18px] font-[600]">
          &#8377;{product?.price}
        </span>
      </div>
      <hr />
      <div className="mt-3">
        <span className="text-[14px]">
          Available In Stock:{" "}
          <span className="text-green-700 font-semibold">
            {product?.countInStock} Items
          </span>
        </span>
        <div className="flex flex-col items-start justify-center">
          {product?.size?.length > 0 && (
            <div className="flex items-center gap-2 size-btns my-3">
              <span className="font-semibold">Size:</span>
              {product?.size?.map((n) => {
                return (
                  <Button
                    onClick={() => setActiveProductSize(n)}
                    className={`${activeProductSize === n && "active-size"}`}
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
              <QtyBox />
            </div>
            <Button className="flex gap-1 !capitalize hover:!bg-black !bg-primary !text-white">
              {" "}
              <IoMdCart size={"20px"} className="" /> Add to Cart
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
