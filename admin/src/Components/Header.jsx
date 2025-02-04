import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { HiMenu } from "react-icons/hi";
import { HiMenuAlt1 } from "react-icons/hi";
import { useState } from "react";
import InputBox from "./InputBox";

import { FaRegBell } from "react-icons/fa";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";

import { LuUserRound } from "react-icons/lu";
import { MdOutlineLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FiActivity } from "react-icons/fi";
import { MyContext } from "../App";
import Logo from "./Logo";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 0,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function Header() {
  const [anchorMyAccount, setAnchorMyAccount] = useState(false);

  const handleCloseMyAcc = () => {
    setAnchorMyAccount(null);
  };

  const context = useContext(MyContext)

  return (
    <header className={`w-full h-[60px] pr-5 shadow-md flex transition-all ${context.isSidebarOpen ? 'pl-[18%]' : 'pl-7'} border-b border-gray-300 items-center justify-between bg-[#fff]`}>
      <div className={`col-1 flex gap-5  ${context.isSidebarOpen ? 'w-[400px]' : 'w-[650px]'}`}>
      {
        !context.isSidebarOpen && (
          <div className="mr-6 border-gray-400 transition-all border-r pr-8 whitespace-nowrap">
            <Logo />
          </div>
        )
      }
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
        {
          context.isLogin ? (
            <div className="relative">
          <Button
            className="!w-[40px] !overflow-hidden !min-w-[40px] !text-gray-700 !rounded-full !h-[40px]"
            onClick={() => setAnchorMyAccount(!anchorMyAccount)}
          >
            <img
              className="h-[30px] w-[30px] min-h-[30px] rounded-full min-w-[30px] object-cover"
              src="https://static.vecteezy.com/system/resources/previews/024/354/241/non_2x/happy-girl-standing-in-creative-office-illustration-ai-generative-free-photo.jpg"
              alt=""
            />
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
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
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
                    src="https://static.vecteezy.com/system/resources/previews/024/354/241/non_2x/happy-girl-standing-in-creative-office-illustration-ai-generative-free-photo.jpg"
                    alt=""
                  />
                </Button>
                <div className="text-start">
                    <h3 className="text-[16px] leading-5 font-[600]">Lisa Dev</h3>
                    <p className="text-[14px]">lisa.sde@gmail.com</p>
                </div>
              </div>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleCloseMyAcc} className="flex items-end gap-3">
                <LuUserRound /> <span className="text-[14px]">Profile</span>    
            </MenuItem>
            <MenuItem onClick={handleCloseMyAcc} className="flex items-end gap-3">
                <IoSettingsOutline /> <span className="text-[14px]">Profile</span>    
            </MenuItem>
            <MenuItem onClick={handleCloseMyAcc} className="flex items-end gap-3">
                <FiActivity /> <span className="text-[14px]">Activity Log</span>    
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleCloseMyAcc} className="flex items-end gap-3">
                <MdOutlineLogout /> <span className="text-[14px]">Sign Out</span>    
            </MenuItem>
          </Menu>
        </div>
          ) : <Button className="!text-white !capitalize !bg-blue-600 !px-3 !py-1 !rounded-full">Sign In</Button>
        }
        
      </div>
    </header>
  );
}

export default Header;
