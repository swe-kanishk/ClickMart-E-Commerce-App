import React, { useContext } from "react";
import Drawer from "@mui/material/Drawer";
import { Button } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MyContext } from "../../App";
import { Link } from "react-router-dom";

function CartPanel() {
  const context = useContext(MyContext);
  return (
    <Drawer
      className="cartPanel"
      anchor={"right"}
      open={context.openCartPanel}
      onClose={() => context.setOpenCartPanel(false)}
    >
      <div className="flex flex-col items-center w-full py-3 justify-between ">
        <div className="flex items-center justify-between border-b gap-3 pb-3 px-4 w-full">
          <h4 className="font-medium">
            Shopping Cart ({context?.cartData?.length || "0"})
          </h4>
          <Button
            className="!rounded-full !min-h-[35px] !h-[35px] !flex !items-center !justify-center !min-w-[35px] !w-[35px] !text-gray-500"
            onClick={() => context.setOpenCartPanel(false)}
          >
            <IoMdClose size={"22px"} />
          </Button>
        </div>
        <div className="scroll w-full px-4 max-h-[565px] overflow-y-scroll overflow-x-hidden">
        {context?.cartData?.length > 0 &&
          context?.cartData?.map((item) => {
            return (
                <div className="cartItem w-full gap-4 flex items-start border-b py-4">
                  <Link
                    to={`/productDetails/${item?.productId}`}
                    className="img-section group w-[25%] border overflow-hidden rounded-lg"
                    onClick={() => context.setOpenCartPanel(false)}
                  >
                      <img
                        className="w-full group-hover:scale-105 transition-all aspect-square object-cover"
                        src={item?.image}
                        alt=""
                      />
                  </Link>
                  <div className="info w-[75%]">
                    <Link
                      to={`/productDetails/${item?.productId}`}
                      onClick={() => context.setOpenCartPanel(false)}
                    >
                      <h4 className="font-medium text-[15px]">
                        {item?.productTitle?.length > 50
                          ? item?.productTitle?.substr(0, 50).concat("...")
                          : item?.productTitle}
                      </h4>
                    </Link>
                    <p className="flex text-[14px] items-center my-2 gap-5">
                      <span className="text-red-600">
                        Qty:{" "}
                        <span className="text-primary">{item?.quantity}</span>
                      </span>
                      <span className="text-red-600 font-medium">
                        Price:{" "}
                        <span className="text-primary">
                          &#8377;{item?.price}
                        </span>
                      </span>
                    </p>
                  </div>
                  <MdOutlineDeleteOutline
                    onClick={() => context?.removeItemFromCart(item?._id)}
                    size={"24px"}
                    className={
                      "cursor-pointer ml-1 transition-all text-gray-500 link"
                    }
                  />
                </div>
            );
          })}
          </div>
      </div>
      <div className="bottom-section w-full">
        <div className="bottomInfo px-4 py-3 w-full border-t flex flex-col items-center gap-1">
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[500]">3 items</span>
            <span className="text-primary font-medium">$117</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[500]">Shipping</span>
            <span className="text-primary font-medium">$9</span>
          </div>
        </div>
        <div className="bottomInfo px-4 py-3 w-full border-t flex flex-col items-center gap-1">
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[500]">Total (tax excl.)</span>
            <span className="text-primary font-medium">$14.00</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[500]">Total (tax incl.)</span>
            <span className="text-primary font-medium">$14.00</span>
          </div>
          <div className="flex items-center justify-between w-full">
            <span className="text-[14px] font-[500]">Taxes</span>
            <span className="text-primary font-medium">$0.00</span>
          </div>
        </div>
        <div className="flex items-center px-4 py-3 border-t justify-between w-full gap-5">
          <Button className="!w-[50%] !bg-red-500 !text-white hover:!bg-black">
            View Cart
          </Button>
          <Link
            to="/checkout"
            className="!w-[50%] d-block"
            onClick={() => context.setOpenCartPanel(false)}
          >
            <Button className="!bg-red-500 !text-white w-full hover:!bg-black">
              CheckOut
            </Button>
          </Link>
        </div>
      </div>
    </Drawer>
  );
}

export default CartPanel;
