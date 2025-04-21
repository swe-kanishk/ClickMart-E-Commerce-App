import React, { useContext, useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import { IoMdClose } from "react-icons/io";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";
import toast from "react-hot-toast";
import { BiLoader } from "react-icons/bi";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Radio } from "@mui/material";

function AddAddress() {
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    addressType: "Home",
    landmark: "",
    status: false,
    selected: false,
  });

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
    console.log(formFields);
  };

  const validValue = Object.values(formFields).every(
    (el) => el !== "" && el !== null && el !== undefined
  );
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
    } else if (formFields.landmark === "") {
      toast.error("Please enter your landmark!");
      return;
    }
    setIsLoading(true);
    postData(`/api/address/add`, formFields, { withCredentials: true }).then(
      (res) => {
        if (res?.success === true) {
          toast.success(res?.message);
          setIsLoading(false);
          context?.setOpenAddressPanel(false);
          setFormFields({
            address_line1: "",
            city: "",
            state: "",
            pincode: "",
            country: "",
            mobile: "",
            addressType: "Home",
            landmark: "",
            status: false,
            selected: false,
          });
        } else {
          toast.error(res?.message);
          setIsLoading(false);
        }
      }
    );
  };
  return (
    <Drawer
      className="addressPanel"
      anchor={"right"}
      open={context?.openAddressPanel}
      onClose={() => context.setOpenAddressPanel(false)}
    >
      <div className="flex flex-col items-center w-full py-3 justify-between ">
        <div className="flex items-center justify-between border-b gap-3 pb-3 px-4 w-full">
          <h4 className="font-medium">Add Address</h4>
          <Button
            className="!rounded-full !min-h-[35px] !h-[35px] !flex !items-center !justify-center !min-w-[35px] !w-[35px] !text-gray-500"
            onClick={() => context.setOpenAddressPanel(false)}
          >
            <IoMdClose size={"22px"} />
          </Button>
        </div>
        <form className="px-5 w-full mt-3 py-2" onSubmit={handleSubmit}>
          <div className="flex items-center gap-5 pb-5">
            <div className="col w-[100%]">
              <TextField
                className="w-full"
                label="Address Line 1"
                variant="outlined"
                name="address_line1"
                disabled={isLoading}
                onChange={handleOnChangeInput}
                value={formFields?.address_line1}
                size="small"
              />
            </div>
          </div>
          <div className="flex items-center gap-5 pb-5">
            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="City"
                variant="outlined"
                disabled={isLoading}
                onChange={handleOnChangeInput}
                value={formFields?.city}
                name="city"
                size="small"
              />
            </div>
            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="State"
                variant="outlined"
                disabled={isLoading}
                onChange={handleOnChangeInput}
                value={formFields?.state}
                name="state"
                size="small"
              />
            </div>
          </div>
          <div className="flex items-center gap-5 pb-5">
            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="Pincode"
                variant="outlined"
                disabled={isLoading}
                onChange={handleOnChangeInput}
                value={formFields?.pincode}
                name="pincode"
                size="small"
              />
            </div>
            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="Country"
                variant="outlined"
                disabled={isLoading}
                onChange={handleOnChangeInput}
                value={formFields?.country}
                name="country"
                size="small"
              />
            </div>
          </div>
          <div className="flex items-center gap-5 pb-5">
            <div className="col w-[50%]">
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
            <div className="col w-[50%]">
              <TextField
                className="w-full"
                label="Landmark"
                variant="outlined"
                disabled={isLoading}
                onChange={handleOnChangeInput}
                value={formFields?.landmark}
                name="landmark"
                size="small"
              />
            </div>
          </div>
          <hr />
          <div className="flex flex-col pb-0 gap-1 mt-4">
            <h3 className="text-gray-600 text-[15px] font-medium">
              Address Type:{" "}
            </h3>
            <div className="col w-full">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="Home"
                  checked={formFields?.addressType === "Home"}
                  control={<Radio />}
                  onChange={handleOnChangeInput}
                  name="addressType"
                  disabled={isLoading}
                  label="Home"
                />
                <FormControlLabel
                  value="Office"
                  checked={formFields?.addressType === "Office"}
                  control={<Radio />}
                  onChange={handleOnChangeInput}
                  name="addressType"
                  disabled={isLoading}
                  label="Office"
                />
              </RadioGroup>
            </div>
          </div>
          <br />
          <Button
              disabled={!validValue || isLoading}
              type="submit"
              className={`!w-full ${
                isLoading || !validValue ? "!bg-red-400" : "!bg-red-500"
              }  !text-white !py-2 !capitalize hover:!bg-black`}
            >
              {isLoading ? (
                <BiLoader size={"22px"} className="animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
        </form>
      </div>
    </Drawer>
  );
}

export default AddAddress;
