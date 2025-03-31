import { Button } from "@mui/material";
import React, { useContext } from "react";

import { FaBagShopping } from "react-icons/fa6";
import CartItem from "./CartItem";
import { MyContext } from "../../App";

function Cart() {
  const context = useContext(MyContext);
  return (
    <section className="py-10">
      <div className="container w-[80%] max-w-[80%] flex gap-5">
        <div className="left-col w-[70%]">
          <div className="shadow-md rounded-md mb-10 bg-white">
            <div className="px-3 py-2 border-b mb-1">
              <h2>Your Cart</h2>
              <p>
                There are{" "}
                <span className="text-red-500 font-medium">
                  {context?.cartData?.length || "0"}
                </span>{" "}
                products in your cart
              </p>
            </div>
            {context?.cartData?.map((item) => {
              return <CartItem key={item?._id} item={item} />;
            })}
          </div>
        </div>
        <div className="right-col w-[30%]">
          <div className="shadow-md rounded-md mb-10 p-5 bg-white">
            <h3 className="pb-3 border-b">Cart Totals</h3>
            <p className="flex mt-2 items-center justify-between">
              <span className="text-[14px] font-[500]">Subtotal</span>
              <span className="text-red-500 font-[600]">$123.00</span>
            </p>
            <p className="flex mt-2 items-center justify-between">
              <span className="text-[14px] font-[500]">Shipping</span>
              <span className="font-[600]">Free</span>
            </p>
            <p className="flex mt-2 items-center justify-between">
              <span className="text-[14px] font-[500]">United Kingdom</span>
              <span className="font-[600]">Free</span>
            </p>
            <p className="flex mt-2 items-center justify-between">
              <span className="text-[14px] font-[500]">Total</span>
              <span className="text-red-500 font-[600]">$123.00</span>
            </p>
            <Button className="!bg-red-500 hover:!bg-black gap-2 !flex !items-center !w-full !text-white !capitalize !font-medium !mt-4">
              Checkout <FaBagShopping size={"16px"} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
