import React, { useContext, useEffect, useState } from "react";
import AccountSidebar from "./AccountSidebar";
import { Radio } from "@mui/material";
import toast from "react-hot-toast";
import { deleteData, editData } from "../../utils/api";
import { MyContext } from "../../App";
import { RiDeleteBin6Line } from "react-icons/ri";

function Address() {
  const context = useContext(MyContext);

  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      context?.userData?.address_details?.forEach((address) => {
        if (address?.selected === true) {
          setSelectedValue(address?._id);
        }
      });
    }
  }, [context?.userData]);

  

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

  const handleRemoveAddress = (_id) => {
    deleteData(`/api/address/${_id}`, { withCredentials: true }).then((res) => {
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
      } else {
        toast.error(es?.data?.message);
      }
    });
  };

  return (
    <>
      <section className="py-10 w-full">
        <div className="container flex gap-5">
          <div className="left-col w-[20%]">
            <AccountSidebar />
          </div>
          <div className="right-col w-[80%]">
            <div className="card bg-white p-5 shadow-md rounded-md mb-5">
              <div className="flex items-center pb-3">
                <h2 className="">Address</h2>
              </div>
              <hr />
              <div
                onClick={() => context?.setOpenAddressPanel(true)}
                className="flex items-center justify-center p-5 border border-dashed border-gray-400 cursor-pointer hover:bg-[#e6f7ff] bg-[#f1faff]"
              >
                <span className="text-[14px] font-[500]">Add New Address</span>
              </div>
              <div className="flex flex-col mt-4 gap-2">
                {context?.userData?.address_details?.length > 0 &&
                  context?.userData?.address_details?.map((address, index) => (
                    <div
                      key={index}
                      className="addressBox group border border-dashed w-full flex flex-col justify-start border-gray-500 p-3 rounded-md cursor-pointer"
                    >
                      <span className="bg-gray-200 ml-2 text-[14px] font-medium w-fit py-1 rounded-md px-2">{address?.addressType}</span>
                      <h4 className="flex ml-1 w-fit mt-1 font-[600] rounded-md px-2 gap-4"><span>{context?.userData?.fullName}</span><span>+{address?.mobile}</span></h4>
                      <div className="flex items-center w-full">
                      <Radio
                        value={address?._id}
                        onChange={handleChange}
                        checked={selectedValue === address?._id}
                        name="address_details"
                      />
                      <span className="text-[14px] font-[500]">
                      {address?.landmark}, {address?.address_line1}, {address?.city},{" "}
                        {address?.state}, {address?.pincode}, {address?.country}
                      </span>
                      <span
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents the click event from reaching the parent
                          handleRemoveAddress(address?._id);
                        }}
                        className="ml-auto text-gray-600 hidden group-hover:flex bg-white rounded-full p-2 transition-all cursor-pointer"
                      >
                        <RiDeleteBin6Line />
                      </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Address;
