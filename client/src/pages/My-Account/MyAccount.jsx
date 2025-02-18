import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import AccountSidebar from "./AccountSidebar";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { editData } from "../../utils/api";
import toast from "react-hot-toast";
import { BiLoader } from "react-icons/bi";

function MyAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const [formFields, setFormFields] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token === "" || token === null || token === undefined) {
      navigate("/");
    }
  }, [localStorage.getItem("accessToken")]);

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setUserId(context?.userData?._id);
      setFormFields({
        email: context?.userData?.email,
        fullName: context?.userData?.fullName,
        mobile: context?.userData?.mobile,
      })
    }
  }, [context?.userData]);

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => ({ ...formFields, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formFields.fullName === "") {
      toast.error("Please enter fullName!");
      return;
    } else if (formFields.email === "") {
      toast.error("Please enter email id!");
      return;
    } else if (formFields.mobile === "") {
      toast.error("Please enter mobile number!");
      return;
    }
    setIsLoading(true);
    editData(`/api/user/${userId}`, formFields, { withCredentials: true }).then(
      (res) => {
        if (res?.data?.success === true) {
          toast.success(res?.data?.message);
          setIsLoading(false);
        } else {
          toast.error(res?.data?.message);
          setIsLoading(false);
        }
      }
    );
  };

  const validValue = Object.values(formFields).every((el) => el);
  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        <div className="left-col w-[20%]">
          <AccountSidebar />
        </div>
        <div className="right-col w-[80%]">
          <div className="card bg-white p-5 shadow-md rounded-md">
            <h2 className="pb-3">My Profile</h2>
            <hr />
            <form className="mt-5" onSubmit={handleSubmit}>
              <div className="flex items-center gap-5">
                <div className="w-[50%]">
                  <TextField
                    label="Full Name"
                    disabled={isLoading}
                    value={formFields.fullName}
                    onChange={handleOnChangeInput}
                    className="w-full"
                    name="fullName"
                    variant="outlined"
                    size="small"
                  />
                </div>
                <div className="w-[50%]">
                  <TextField
                    label="Email"
                    disabled={true}
                    value={formFields.email}
                    onChange={handleOnChangeInput}
                    type="email"
                    className="w-full"
                    name="email"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
              <div className="flex items-center mt-4 gap-5">
                <div className="w-[50%]">
                  <TextField
                    label="Phone Number"
                    disabled={isLoading}
                    value={formFields.mobile}
                    onChange={handleOnChangeInput}
                    className="w-full"
                    name="mobile"
                    variant="outlined"
                    size="small"
                  />
                </div>
              </div>
              <br />
              <div className="flex items-center gap-5">
                <Button
                  disabled={!validValue || isLoading}
                  type="submit"
                  className={`!w-fit ${
                    (isLoading || !validValue) ? "!bg-red-400" : "!bg-red-500"
                  }  !text-white !py-1 hover:!bg-black`}
                >
                  {isLoading ? (
                    <BiLoader size={"22px"} className="animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyAccount;
