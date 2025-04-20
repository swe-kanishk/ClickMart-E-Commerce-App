import React, { useContext, useEffect, useState } from "react";
import AccountSidebar from "./AccountSidebar";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { MenuItem, Radio, Select } from "@mui/material";
import { BiLoader } from "react-icons/bi";
import toast from "react-hot-toast";
import { deleteData, editData, postData } from "../../utils/api";
import { MyContext } from "../../App";
import { RiDeleteBin6Line } from "react-icons/ri";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function Address() {
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(MyContext);

  const [selectedValue, setSelectedValue] = useState(null);

  const handleClickOpen = () => {
    setIsOpenModel(true);
  };

  const handleClose = () => {
    setIsOpenModel(false);
  };

  const [formFields, setFormFields] = useState({
    address_line1: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    addressType: 'Home',
    landmark: "",
    status: false,
    selected: false,
  });

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      context?.userData?.address_details?.forEach((address) => {
        if (address?.selected === true) {
          setSelectedValue(address?._id);
        }
      });
    }
  }, [context?.userData]);

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
    console.log(formFields);
  };

  const validValue = Object.values(formFields).every(
    (el) => el !== "" && el !== null && el !== undefined
  );

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
          setIsOpenModel(false);
          setFormFields({
            address_line1: "",
            city: "",
            state: "",
            pincode: "",
            country: "",
            mobile: "",
            addressType: 'Home',
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
                onClick={handleClickOpen}
                className="flex items-center justify-center p-5 border border-dashed border-gray-400 cursor-pointer hover:bg-[#e6f7ff] bg-[#f1faff]"
              >
                <span className="text-[14px] font-[500]">Add New Address</span>
              </div>
              <div className="flex flex-col mt-4 gap-2">
                {context?.userData?.address_details?.length > 0 &&
                  context?.userData?.address_details?.map((address, index) => (
                    <div
                      key={index}
                      className="addressBox group border border-dashed border-gray-400 w-full flex items-center justify-start bg-[#f1f1f1] p-3 rounded-md cursor-pointer"
                    >
                      <Radio
                        value={address?._id}
                        onChange={handleChange}
                        checked={selectedValue === address?._id}
                        name="address_details"
                      />
                      <span className="text-[14px] font-[500]">
                        {address?.address_line1}, {address?.city},{" "}
                        {address?.state}, {address?.pincode}, {address?.country}
                        , {address?.mobile}
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
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={isOpenModel}>
        <DialogTitle>Add New Address</DialogTitle>
        <form className="px-5 py-2" onSubmit={handleSubmit}>
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
                label="State"
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
            <h3 className="text-gray-600 text-[15px] font-medium">Address Type: </h3>
            <div className="col w-full">
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="Home"
                    checked={formFields?.addressType === 'Home'}
                    control={<Radio />}
                    onChange={handleOnChangeInput}
                    name="addressType"
                    disabled={isLoading}
                    label="Home"
                  />
                  <FormControlLabel
                    value="Office"
                    checked={formFields?.addressType === 'Office'}
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
          <div className="flex items-center pb-2 gap-5 justify-between">
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
            <Button
              onClick={handleClose}
              className={`!w-full btn-org ${
                isLoading ? "!bg-gray-100" : "!bg-gray-200"
              }  !text-black !py-2 !capitalize hover:!bg-gray-200`}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}

export default Address;
