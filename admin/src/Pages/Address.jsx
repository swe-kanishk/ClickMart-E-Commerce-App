import { Button } from "@mui/material";
import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { postData } from "../utils/api";
import { BiLoader } from "react-icons/bi";
import toast from "react-hot-toast";

function Address() {
  const [isLoading, setIsLoading] = useState(false);

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: false,
  });

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => ({ ...formFields, [name]: value }));
  };

  const validValue = Object.values(formFields).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formFields.address_line1 === "") {
      toast.error("Please enter Address line!");
      return;
    } else if (formFields.city === "") {
      toast.error("Please enter your city name!");
      return;
    } else if (formFields.state === "") {
      toast.error("Please enter your state!");
      return;
    } else if (formFields.pincode === "") {
      toast.error("Please enter your pincode!");
      return;
    } else if (formFields.country === "") {
      toast.error("Please enter your country!");
      return;
    } else if (formFields.mobile === "") {
      toast.error("Please enter your mobile no.!");
      return;
    }
    setIsLoading(true);
    postData(`/api/address/add`, formFields, { withCredentials: true }).then((res) => {
      if (res?.success === true) {
        toast.success(res?.message);
        setIsLoading(false);
      } else {
        toast.error(res?.message);
        setIsLoading(false);
      }
    });
  };
  return (
    <section className="w-[35%] bg-white p-5 shadow-md shadow-gray-300 border rounded-md my-4">
      <h2 className="text-[20px] font-[600]">Add Address</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="scroll max-h-[78vh] pt-4 overflow-y-scroll">
          <div className="grid grid-cols-1 mb-3">
            <div className="col w-full">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Address Line 1
              </h3>
              <input
                type="text"
                name="address_line1"
                disabled={isLoading}
                value={formFields?.address_line1}
                onChange={handleOnChangeInput}
                className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="col w-full">
              <h3 className="text-[14px] text-black font-[500] mb-1">City</h3>
              <input
                type="text"
                onChange={handleOnChangeInput}
                name="city"
                disabled={isLoading}
                value={formFields?.city}
                className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
              />
            </div>
            <div className="col w-full">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Pin Code
              </h3>
              <input
                type="text"
                name="pincode"
                value={formFields?.pincode}
                disabled={isLoading}
                onChange={handleOnChangeInput}
                className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="col w-full">
              <h3 className="text-[14px] text-black font-[500] mb-1">State</h3>
              <input
                type="text"
                onChange={handleOnChangeInput}
                name="state"
                value={formFields?.state}
                disabled={isLoading}
                className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
              />
            </div>
            <div className="col w-full">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Country
              </h3>
              <input
                type="text"
                name="country"
                value={formFields?.country}
                disabled={isLoading}
                onChange={handleOnChangeInput}
                className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="col w-full">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Mobile No.
              </h3>
              <PhoneInput
                defaultCountry="in"
                name="mobile"
                disabled={isLoading}
                value={formFields?.mobile || ""}
                onChange={(mobile) => {
                  setFormFields((prev) => ({ ...prev, mobile }));
                }}
              />
            </div>
            <div className="col w-full">
              <h3 className="text-[14px] text-black font-[500] mb-1">Status</h3>
              <Select
                value={formFields?.status}
                onChange={handleOnChangeInput}
                displayEmpty
                size="small"
                disabled={isLoading}
                name="status"
                className="!w-full !p-[2px]"
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </div>
          </div>
          <br />
        </div>
        <br />
        <Button
          disabled={!validValue || isLoading}
          type="submit"
          className={`!w-full ${
            (isLoading || !validValue) ? "!bg-blue-400" : "!bg-blue-500"
          }  !text-white !py-1 !capitalize hover:!bg-black`}
        >
          {isLoading ? (
            <BiLoader size={"22px"} className="animate-spin" />
          ) : (
            "Add New Address"
          )}
        </Button>
      </form>
    </section>
  );
}

export default Address;
