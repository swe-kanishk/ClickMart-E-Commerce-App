import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, Radio } from "@mui/material";
import { IoBagCheck } from "react-icons/io5";
import { MyContext } from "../../App";
import { FaPlus } from "react-icons/fa6";
import { editData } from "../../utils/api";

function Checkout() {
  const context = useContext(MyContext);
    const [selectedValue, setSelectedValue] = useState(null);
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        editData(
          `/api/address/select/${event.target.value}`,
          {},
          { withCredentials: true }
        ).then((res) => {
          setSelectedValue(res?.data?.updatedAddress?._id);
        });
      };

      useEffect(() => {
          if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
            context?.userData?.address_details?.forEach((address) => {
              if (address?.selected === true) {
                setSelectedValue(address?._id);
              }
            });
          }
        }, [context?.userData]);
  return (
    <section className="py-10">
      <div className="container flex gap-5">
        <div className="left-col w-[60%]">
          <div className="card bg-white shadow-md p-5 rounded-md w-full">
            <div className="flex items-center justify-between w-full">
              <h2>Select Delivery Address</h2>
              <Button
                onClick={() => context?.setOpenAddressPanel(true)}
                className="!bg-primary hover:!bg-blue-500 !text-white !capitalize gap-1"
              >
                <FaPlus /> Add New Address
              </Button>
            </div>
            <div className="flex flex-col mt-4 gap-2">
              {context?.userData?.address_details?.length > 0 &&
                context?.userData?.address_details?.map((address, index) => (
                  <div
                    key={index}
                    className={`addressBox group border ${selectedValue === address?._id ? "bg-green-50" : "bg-white"} border-dashed w-full flex flex-col justify-start border-gray-500 p-3 rounded-md cursor-pointer`}
                  >
                    <span className={`ml-2 ${selectedValue === address?._id ? "bg-white" : "bg-gray-200"} text-[14px] font-medium w-fit py-1 rounded-md px-2`}>
                      {address?.addressType}
                    </span>
                    <h4 className="flex ml-1 w-fit mt-1 font-[600] rounded-md px-2 gap-4">
                      <span>{context?.userData?.fullName}</span>
                      <span>+{address?.mobile}</span>
                    </h4>
                    <div className="flex items-center w-full">
                      <Radio
                        value={address?._id}
                        onChange={handleChange}
                        checked={selectedValue === address?._id}
                        name="address_details"
                      />
                      <span className="text-[14px] font-[500]">
                        {address?.landmark}, {address?.address_line1}, {address?.city},{" "}
                        {address?.state}, {address?.pincode}, {address?.country}.
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="right-col w-[40%]">
          <div className="card bg-white shadow-md p-5 rounded-md w-full">
            <h2 className="mb-3">Your Order</h2>
            <div className="flex items-center justify-between border-b py-3 pr-2 border-t">
              <span className="text-[14px] font-[500]">Product</span>
              <span className="text-[14px] font-[500]">Subtotal</span>
            </div>
            <div className="scroll max-h-[250px] mb-4 overflow-x-hidden overflow-y-scroll pr-2">
              {context?.cartData?.map((item) => {
                return (
                  <div className="flex items-start justify-between py-3">
                    <div className="product justify-between flex items-start gap-3">
                      <div className="product-img w-[50px] h-[50px] object-cover rounded-md group object-center overflow-hidden cursor-pointer">
                        <img
                          src={item?.image}
                          className="w-full transition-all group-hover:scale-110"
                          alt=""
                        />
                      </div>
                      <div className="product-info">
                        <h4 className="text-[14px] ml-1">
                          {item?.productTitle?.length > 35
                            ? item?.productTitle?.substr(0, 35).concat("...")
                            : item?.productTitle}
                        </h4>
                        <span className="text-[13px]">
                          Qty: {item?.quantity}
                        </span>
                      </div>
                    </div>
                    <span className="text-[14px] font-[500]">
                      {(item?.price * item?.quantity)?.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </span>
                  </div>
                );
              })}
            </div>
            <Button className="!bg-red-500 !text-white !w-full gap-2 !flex !items-center hover:!bg-black !capitalize">
              <IoBagCheck size={"18px"} /> Checkout
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
