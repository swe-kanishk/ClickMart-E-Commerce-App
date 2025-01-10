import { Button, DialogContent, Rating } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa6";

function WishlistItem() {
  return (
    <>
    <div className="cartItem w-full border-b pb-5 border-gray-300 p-3 flex items-start gap-5">
      <div className="img-section w-[20%] rounded-lg overflow-hidden">
        <Link className="w-full">
          <img
            src="https://img.freepik.com/free-photo/fashion-girl-posing-studio-wearing-smart-casual-sportive-outfit-business-style-sweet-pastel-colors-sunglasses-backpack-denim-jacket-mint-background-stylish-woman_291049-1800.jpg"
            alt=""
            className="w-full object-cover aspect-square overflow-hidden"
          />
        </Link>
      </div>
      <div className="info w-[80%] relative">
        <Button className="!rounded-full !absolute !-top-1 !-right-1 !min-h-[35px] !h-[35px] !flex !items-center !justify-center !min-w-[35px] !w-[35px] !text-gray-500">
          <IoMdClose size={"22px"} />
        </Button>
        <span className="text-[13px]">Zara</span>
        <h3 className="text-[15px]">
          <Link to="/" className="link">
            Pure Cotton Slin Fit Printed Casual Top with Shirt
          </Link>
        </h3>
        <Rating name="read-only" value={4} size="small" readOnly />
        <div className="flex items-center gap-1">
          <span className="oldPrice text-primary text-[14px] font-medium">
            $48.00
          </span>
          <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
            $56.00
          </span>
          <span className="oldPrice text-red-500 text-[14px] font-[500]">
            18% off
          </span>
        </div>
        <br />
        <Button className="!bg-red-500 !text-white !text-[14px] !capitalize gap-2 btn-sm hover:!bg-black"><FaCartPlus size={'16px'} /> Add to Cart</Button>
      </div>
    </div>
    </>
  );
}

export default WishlistItem;
