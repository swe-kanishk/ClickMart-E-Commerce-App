import { Button, DialogContent, Rating } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { GoTriangleDown } from "react-icons/go";
import { MyContext } from "../../App";

function CartItem({item}) {
    const context = useContext(MyContext)
    const [isOpenSizeDialog, setIsOpenSizeDialog] = useState(false)
    const [ratingValue, setRatingValue] = useState(2);
  return (
    <>
    <div className="cartItem w-full border-b pb-5 border-gray-300 p-3 flex items-start gap-4">
      <div className="img-section w-[15%] rounded-lg overflow-hidden">
        <Link>
          <img
            src={item?.image}
            alt=""
            className="w-full"
          />
        </Link>
      </div>
      <div className="info w-[85%] relative">
        <Button onClick={() => context?.removeItemFromCart(item?._id)} className="!rounded-full !absolute !-top-1 !-right-1 !min-h-[35px] !h-[35px] !flex !items-center !justify-center !min-w-[35px] !w-[35px] !text-gray-500">
          <IoMdClose size={"22px"} />
        </Button>
        <span className="text-[13px]">{item?.brand}</span>
        <h3 className="text-[15px]">
          <Link to="/" className="link">
            {item?.productTitle}
          </Link>
        </h3>
        <Rating name="read-only" value={item?.rating} size="small" readOnly />
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
            Qty: {item?.quantity} <GoTriangleDown />
          </span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="oldPrice text-primary text-[14px] font-medium">
            &#8377;{item?.price}
          </span>
          <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
          &#8377;{item?.oldPrice}
          </span>
          <span className="oldPrice text-red-500 text-[14px] font-[500]">
            {item?.discount}% off
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
