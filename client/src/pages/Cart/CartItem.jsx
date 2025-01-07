import { Button, DialogContent, Rating } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { GoTriangleDown } from "react-icons/go";

function CartItem() {
    const [isOpenSizeDialog, setIsOpenSizeDialog] = useState(false)
    const [ratingValue, setRatingValue] = useState(2);
  return (
    <>
    <div className="cartItem w-full border-b pb-5 border-gray-300 p-3 flex items-start gap-4">
      <div className="img-section w-[15%] rounded-lg overflow-hidden">
        <Link>
          <img
            src="https://img.freepik.com/free-photo/fashion-girl-posing-studio-wearing-smart-casual-sportive-outfit-business-style-sweet-pastel-colors-sunglasses-backpack-denim-jacket-mint-background-stylish-woman_291049-1800.jpg"
            alt=""
            className="w-full"
          />
        </Link>
      </div>
      <div className="info w-[85%] relative">
        <Button className="!rounded-full !absolute !-top-1 !-right-1 !min-h-[35px] !h-[35px] !flex !items-center !justify-center !min-w-[35px] !w-[35px] !text-gray-500">
          <IoMdClose size={"22px"} />
        </Button>
        <span className="text-[13px]">Zara</span>
        <h3 className="text-[15px]">
          <Link to="/" className="link">
            Pure Cotton Slin Fit Printed Casual Top with Shirt
          </Link>
        </h3>
        <Rating name="read-only" value={ratingValue} size="small" readOnly />
        <div className="flex items-center gap-4">
          <span
            onClick={() => setIsOpenSizeDialog(false)}
            className="flex items-center justify-center bg-[#f1f1f1] py-1 px-3 cursor-pointer rounded-md font-medium mt-2 text-[12px]"
          >
            Size: S <GoTriangleDown />
          </span>
          <span
            onClick={() => setIsOpenSizeDialog(false)}
            className="flex items-center justify-center bg-[#f1f1f1] py-1 px-3 cursor-pointer rounded-md font-medium mt-2 text-[12px]"
          >
            Qty: 1 <GoTriangleDown />
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
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
      </div>
    </div>
    <Dialog onClose={() => setIsOpenSizeDialog(false)} open={isOpenSizeDialog}>
      <DialogTitle>Select Size</DialogTitle>
      <DialogContent></DialogContent>
    </Dialog>
    </>
  );
}

export default CartItem;
