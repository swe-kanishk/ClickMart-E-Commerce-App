import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { HiMenu } from "react-icons/hi";
import { HiMenuAlt1 } from "react-icons/hi";
import { useState } from "react";
import InputBox from "./InputBox";

import { FaRegBell } from "react-icons/fa";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import toast from "react-hot-toast";

import { LuUserRound } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FiActivity } from "react-icons/fi";
import { MyContext } from "../App";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { getData } from "../utils/api";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import { IoMdClose } from "react-icons/io";

import AddProduct from "../Pages/product/AddProduct";
import AddHomeSlide from "../Pages/AddHomeSlide";
import AddNewCategory from "../Pages/category/AddNewCategory";
import AddNewAddress from "../Pages/AddNewAddress";
import EditCategory from "../Pages/category/EditCategory";
import AddNewSubCategory from "../Pages/subCategory/AddNewSubCategory";
import EditProduct from "../Pages/product/EditProduct";
import CreateNewBlog from "../Pages/Blog/CreateNewBlog";
import EditBlog from "../Pages/Blog/EditBlog";
import AddBannerV1 from "../Pages/banners/AddBannerV1";
import EditBannerV1 from "../Pages/banners/EditBannerV1";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Header() {
  const [anchorMyAccount, setAnchorMyAccount] = useState(false);

  const handleCloseMyAcc = () => {
    setAnchorMyAccount(null);
  };

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    getData(`/api/user/logout?token=${localStorage.getItem("accessToken")}`, {
      withCredentials: true,
    })
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          context.setIsLogin(false);
          navigate("/");
        } else {
          toast.error(res?.message);
        }
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        toast.error("Logout failed. Please try again.");
      });
  };
  
  return (
    <>
      <header
        className={`w-full h-[60px] pr-5 shadow-md flex transition-all ${
          context.isSidebarOpen ? "pl-[18%]" : "pl-7"
        } border-b border-gray-300 items-center justify-between bg-[#fff]`}
      >
        <div
          className={`col-1 flex gap-5  ${
            context.isSidebarOpen ? "w-[400px]" : "w-[650px]"
          }`}
        >
          {!context.isSidebarOpen && (
            <div className="mr-6 border-gray-400 transition-all border-r pr-8 whitespace-nowrap">
              <Logo />
            </div>
          )}
          <Button
            className="!w-[40px] z-50 !min-w-[40px] !text-gray-700 !rounded-full !h-[40px]"
            onClick={() => context.setIsSidebarOpen(!context.isSidebarOpen)}
          >
            {context.isSidebarOpen ? (
              <HiMenu size={"20px"} />
            ) : (
              <HiMenuAlt1 size={"20px"} />
            )}
          </Button>
          <InputBox />
        </div>
        <div className="col-2 flex items-center justify-end w-[30%] gap-5">
          <IconButton aria-label="Notifications">
            <StyledBadge badgeContent={4} color="primary">
              <FaRegBell />
            </StyledBadge>
          </IconButton>
          {context.isLogin ? (
            <div className="relative">
              <Button
                className="!w-[40px] !overflow-hidden !min-w-[40px] !text-gray-700 !rounded-full !h-[40px]"
                onClick={() => setAnchorMyAccount(!anchorMyAccount)}
              >
                {context?.adminData?.avatar ? (
                  <img
                    className="h-[30px] w-[30px] min-h-[30px] rounded-full min-w-[30px] object-cover"
                    src={context?.adminData?.avatar}
                    alt=""
                  />
                ) : (
                  <img
                    src={"./user-avatar.png"}
                    alt="avatar"
                    className="h-[30px] w-[30px] min-h-[30px] rounded-full min-w-[30px] object-cover"
                  />
                )}
              </Button>
              <Menu
                anchorEl={anchorMyAccount}
                id="account-menu"
                open={anchorMyAccount}
                onClose={handleCloseMyAcc}
                onClick={handleCloseMyAcc}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
              >
                <MenuItem onClick={handleCloseMyAcc}>
                  <div className="flex items-center gap-3">
                    <Button className="!w-[40px] !overflow-hidden !min-w-[40px] !text-gray-700 !rounded-full !h-[40px]">
                      <img
                        className="h-[38px] w-[38px] min-h-[38px] rounded-full min-w-[38px] object-cover"
                        src={context?.adminData?.avatar}
                        alt=""
                      />
                    </Button>
                    <div className="text-start">
                      <h3 className="text-[16px] leading-5 font-[600]">
                        {context?.adminData?.fullName}
                      </h3>
                      <p className="text-[14px]">{context?.adminData?.email}</p>
                    </div>
                  </div>
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => navigate("/profile")}
                  className="flex items-end gap-3"
                >
                  <LuUserRound /> <span className="text-[14px]">Profile</span>
                </MenuItem>
                <MenuItem
                  onClick={handleCloseMyAcc}
                  className="flex items-end gap-3"
                >
                  <IoSettingsOutline />{" "}
                  <span className="text-[14px]">Settings</span>
                </MenuItem>
                <MenuItem
                  onClick={handleCloseMyAcc}
                  className="flex items-end gap-3"
                >
                  <FiActivity />{" "}
                  <span className="text-[14px]">Activity Log</span>
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={handleLogout}
                  className="flex items-end gap-3"
                >
                  <MdOutlineLogout />{" "}
                  <span className="text-[14px]">Logout</span>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to={"/login"}>
              <Button className="!text-white !capitalize !bg-blue-600 !px-3 !py-1 !rounded-full">
                Login
              </Button>
            </Link>
          )}
        </div>
      </header>

      <Dialog
          fullScreen
          open={context?.isOpenFullScreenPannel?.open}
          onClose={context?.handleCloseFullScreenPannel}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={context?.handleCloseFullScreenPannel}
                aria-label="close"
              >
                <IoMdClose className="text-gray-800" />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                <span className="text-gray-800">
                  {context?.isOpenFullScreenPannel?.model}
                </span>
              </Typography>
            </Toolbar>
          </AppBar>
          {context?.isOpenFullScreenPannel?.model === "Add Product" && <AddProduct />}
          {context?.isOpenFullScreenPannel?.model === "Add Home Slide" && (
            <AddHomeSlide />
          )}
          {context?.isOpenFullScreenPannel?.model === "Add New Category" && (
            <AddNewCategory />
          )}
          {context?.isOpenFullScreenPannel?.model === "Add New Sub Category" && (
            <AddNewSubCategory />
          )}
          {context?.isOpenFullScreenPannel?.model === "Add New Address" && (
            <AddNewAddress />
          )}
          {context?.isOpenFullScreenPannel?.model === "Edit Category" && <EditCategory />}
          {context?.isOpenFullScreenPannel?.model === "Edit Product" && <EditProduct />}
          {context?.isOpenFullScreenPannel?.model === "Create Blog" && <CreateNewBlog />}
          {context?.isOpenFullScreenPannel?.model === "Edit Blog" && <EditBlog />}
          {context?.isOpenFullScreenPannel?.model === "Add Banner1" && <AddBannerV1 />}
          {context?.isOpenFullScreenPannel?.model === "Edit Banner1" && <EditBannerV1 />}
        </Dialog>
    </>
  );
}

export default Header;
