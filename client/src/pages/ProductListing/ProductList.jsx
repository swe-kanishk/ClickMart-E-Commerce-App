import React, { useState } from "react";
import ProductListSidebar from "./ProductListSidebar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductItem from "../Home/Products/ProductItem";
import { IoGrid } from "react-icons/io5";
import { FaListUl } from "react-icons/fa";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ProductItemListView from "../Home/Products/ProductItemListView";
import Pagination from '@mui/material/Pagination';

function ProductList() {
  const [itemView, setItemView] = useState("grid");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <section className="pt-5">
      <div className="container">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            className="link transition"
            color="inherit"
            href="/"
          >
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/"
            className="link transition"
          >
            Fashion
          </Link>
        </Breadcrumbs>
      </div>
      <div className="p-2 my-4 bg-white">
        <div className="container flex gap-3">
          <div className="sidebarWrapper border-r pr-5 w-[20%]">
            <ProductListSidebar />
          </div>
          <div className="rightContent w-[80%] py-3">
            <div className="bg-[#f1f1f1] mb-6 p-2 w-full rounded-md flex items-center justify-between">
              <div className="col-1 flex items-center gap-1">
                <Button
                  onClick={() => setItemView("list")}
                  className={`!w-[40px] !min-w-[40px] !h-[40px] !rounded-full !text-black ${itemView === 'list' ? '!bg-gray-500 !text-white opacity-85' : 'text-[#3d3d3d]'}`}
                >
                  <FaListUl size={"18px"} />
                </Button>
                <Button
                  onClick={() => setItemView("grid")}
                  className={`!w-[40px] !min-w-[40px] !h-[40px] !rounded-full !text-black ${itemView === 'grid' ? '!bg-gray-500 !text-white opacity-85' : 'text-[#3d3d3d]'}`}
                >
                  <IoGrid size={"18px"} />
                </Button>
                <span className="text-[14px] text-gray-500 font-[500] pl-3">
                  There are 23 products
                </span>
              </div>
              <div className="col-2 flex items-center gap-2 pr-2 relative">
                <span className="text-[14px] text-gray-500 font-[500] pl-3">
                  Sort By:
                </span>
                <div className="relative">
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    className="!bg-white !text-[14px] !border-2 !border-gray-600 !text-gray-600 !capitalize"
                  >
                    Dashboard
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose} className="!text-[14px]">
                      Sales, highest to lowest
                    </MenuItem>
                    <MenuItem onClick={handleClose} className="!text-[14px]">
                      Relevance
                    </MenuItem>
                    <MenuItem onClick={handleClose} className="!text-[14px]">
                      Name, A to Z
                    </MenuItem>
                    <MenuItem onClick={handleClose} className="!text-[14px]">
                      Name, Z to A
                    </MenuItem>
                    <MenuItem onClick={handleClose} className="!text-[14px]">
                      Price, low to high
                    </MenuItem>
                    <MenuItem onClick={handleClose} className="!text-[14px]">
                      Price, high to low
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
            <div className={`flex items-start ${itemView === 'list' ? 'flex-col' : 'flex-row'} justify-evenly flex-wrap gap-3`}>
            {itemView === "grid" ? (
                <>
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                </>
            ) : (
                <>
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                <ProductItemListView />
                </>
            )}
          </div>
          <div className="flex items-end justify-end mb-2 mt-10 pagination-btn">
          <Pagination count={10} variant="outlined" shape="rounded" />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

export default ProductList;
