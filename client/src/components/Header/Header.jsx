import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosGitCompare } from "react-icons/io";
import { BsCart3 } from "react-icons/bs";
import Tooltip from '@mui/material/Tooltip';
import Navigation from "./Navigation/Navigation";
import Logo from "./logo";
import { MyContext } from "../../App";
import CartPanel from "../cart/CartPanel";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function Header() {

  const context = useContext(MyContext)
  return (
    <>
    <header className="bg-white">
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
          <div className="col-2 w-[45%]">
            <Search />
          </div>
          <div className="col-3 w-[30%] flex items-center">
            <ul className="flex items-center gap-3 pl-5 justify-end w-full">
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
                <IconButton aria-label="wishlist">
                  <StyledBadge badgeContent={4} color="primary">
                    <IoMdHeartEmpty />
                  </StyledBadge>
                </IconButton>
                </Tooltip>
              </li>
              <li>
              <Tooltip title="Cart">
                <IconButton onClick={() => context.setOpenCartPanel(true)} aria-label="cart">
                  <StyledBadge badgeContent={4} color="primary">
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