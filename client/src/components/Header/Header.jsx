import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoIosGitCompare } from "react-icons/io";
import { BsCart3 } from "react-icons/bs";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation/Navigation";
import Logo from "./logo";
import { MyContext } from "../../App";
import CartPanel from "../../pages/Cart/CartPanel";
import { Button } from "@mui/material";
import { FaRegUser } from "react-icons/fa";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { HiClipboardCheck } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";
import { getData } from "../../utils/api";
import toast from "react-hot-toast";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function Header() {
  const context = useContext(MyContext);
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    getData(
      `/api/user/logout?token=${localStorage.getItem("accessToken")}`,
      {withCredentials: true}
    )
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          context.setIsLogin(false);
          context.setCartData([]);
          navigate('/')
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
      <header className="bg-white sticky -top-[50px] z-[100] w-full">
        <div className="top-strip py-2 border-t-[1px] border-b-[1px] border-gray-200">
          <div className="container">
            <div className="flex items-center justify-between">
              <div className="col-1 w-[50%]">
                <p className="text-[14px] font-[500]">
                  Get up to 50% off new season styles. limited time only
                </p>
              </div>
              <div className="col-2 w-[50%] flex items-center justify-end">
                <ul className="flex items-center gap-3">
                  <li className="list-none">
                    <Link
                      to="#"
                      className="text-[13px] link font-[500] transition"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li className="list-none">
                    <Link
                      to="#"
                      className="text-[13px] link font-[500] transition"
                    >
                      Order Tracking
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <nav className="border-b-[1px] border-gray-200">
          <div className="container flex items-center justify-between py-3">
            <div className="col-1 w-[25%]">
              <Logo />
            </div>
            <div className="col-2 w-[40%]">
              <Search />
            </div>
            <div className="col-3 w-[35%] flex items-center">
              <ul className="flex user items-center gap-3 pl-5 justify-end w-full">
                {context.isLogin ? (
                  <>
                    <Button
                      onClick={handleClick}
                      className="!w-full btn cursor-pointer !text-gray-600 !flex !items-end !justify-start gap-2"
                    >
                      <Button className="!rounded-full btn !min-w-[40px] !h-[40px] !text-gray-600 !bg-[#f1f1f1] !w-[40px] !min-h-[40px]">
                        <FaRegUser size={"20px"} />
                      </Button>
                      <div className="info flex flex-col w-full justify-center items-start">
                        <h4 className="text-[14px] capitalize leading-3">
                          {context?.userData?.fullName}
                        </h4>
                        <span className="text-[13px] !lowecase">
                         {context?.userData?.email}
                        </span>
                      </div>
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
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
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <Link to={"/my-account"} className="w-full block">
                        <MenuItem
                          onClick={handleClose}
                          className="!flex !gap-2 !py-2"
                        >
                          <FaRegUser size={"16px"} />{" "}
                          <span className="text-[15px] font-[500]">
                            My account
                          </span>
                        </MenuItem>
                      </Link>
                      <Link to={"/orders"} className="w-full block">
                        <MenuItem
                          onClick={handleClose}
                          className="!flex !gap-2 !py-2"
                        >
                          <HiClipboardCheck size={"18px"} />{" "}
                          <span className="text-[15px] font-[500]">orders</span>
                        </MenuItem>
                      </Link>
                      <Link to={"/wishlist"} className="w-full block">
                        <MenuItem
                          onClick={handleClose}
                          className="!flex !gap-2 !py-2"
                        >
                          <IoMdHeart size={"18px"} />{" "}
                          <span className="text-[15px] font-[500]">
                            My List
                          </span>
                        </MenuItem>
                      </Link>
                      <MenuItem
                        onClick={handleLogout}
                        className="!flex !gap-2 !py-2"
                      >
                        <IoLogOutOutline size={"18px"} />
                        <span className="text-[15px] font-[500]">Logout</span>
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <li className="list-none">
                    <Link
                      to={"/login"}
                      className="link transition text-[15px] font-[500]"
                    >
                      Login
                    </Link>{" "}
                    |{" "}
                    <Link
                      to={"/register"}
                      className="link transition text-[15px] font-[500]"
                    >
                      Register
                    </Link>
                  </li>
                )}
                <li>
                  <Tooltip title="Compare">
                    <IconButton aria-label="compare">
                      <StyledBadge badgeContent={4} color="primary">
                        <IoIosGitCompare />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip title="Wishlist">
                    <IconButton onClick={() => navigate('/wishlist')} aria-label="wishlist">
                      <StyledBadge badgeContent={context?.myWishlistData?.length || 0} color="primary">
                        <IoMdHeartEmpty />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </li>
                <li>
                  <Tooltip title="Cart">
                    <IconButton
                      onClick={() => context.setOpenCartPanel(true)}
                      aria-label="cart"
                    >
                      <StyledBadge badgeContent={context?.cartData?.length || 0} color="primary">
                        <BsCart3 />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Navigation />
      </header>
      <CartPanel />
    </>
  );
}

export default Header;
