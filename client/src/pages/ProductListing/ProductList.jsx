import React, { useState, useEffect } from "react";
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
import Pagination from "@mui/material/Pagination";
import ProductSkelton from "./ProductSkelton";

function ProductList() {
  const [itemView, setItemView] = useState("grid");
  const [anchorEl, setAnchorEl] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("relevance"); // New state for sorting

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (sortOption) => {
    if (sortOption) {
      setSortBy(sortOption); // Update sort option when a menu item is clicked
    }
    setAnchorEl(null);
  };

  const sortProducts = (products) => {
    const sortedProducts = [...products]; // Create a copy to avoid mutating the original array
    switch (sortBy) {
      case "sales-desc":
        return sortedProducts.sort((a, b) => (b.sales || 0) - (a.sales || 0)); // Highest to lowest sales
      case "relevance":
        return sortedProducts;
      case "name-asc":
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name)); // A to Z
      case "name-desc":
        return sortedProducts.sort((a, b) => b.name.localeCompare(a.name)); // Z to A
      case "price-asc":
        return sortedProducts.sort((a, b) => a.price - b.price); // Low to high price
      case "price-desc":
        return sortedProducts.sort((a, b) => b.price - a.price); // High to low price
      default:
        return sortedProducts;
    }
  };

  const [sortedProducts, setSortedProducts] = useState([]);
  useEffect(() => {
    if (productsData?.length > 0) {
      const sorted = sortProducts(productsData);
      setSortedProducts(sorted);
    }
  }, [productsData, sortBy]);

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
            products
          </Link>
        </Breadcrumbs>
      </div>
      <div className="p-2 my-4 bg-white">
        <div className="container flex gap-3">
          <div className="sidebarWrapper border-r pr-5 w-[20%]">
            <ProductListSidebar
              setProductsData={setProductsData}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              limit={limit}
              page={page}
              setTotalPages={setTotalPages}
            />
          </div>
          <div className="rightContent w-[80%] py-3">
            <div className="bg-[#f1f1f1] mb-6 p-2 w-full rounded-md flex items-center justify-between">
              <div className="col-1 flex items-center gap-1">
                <Button
                  onClick={() => setItemView("list")}
                  className={`!w-[40px] !min-w-[40px] !h-[40px] !rounded-full !text-black ${
                    itemView === "list"
                      ? "!bg-gray-500 !text-white opacity-85"
                      : "text-[#3d3d3d]"
                  }`}
                >
                  <FaListUl size={"18px"} />
                </Button>
                <Button
                  onClick={() => setItemView("grid")}
                  className={`!w-[40px] !min-w-[40px] !h-[40px] !rounded-full !text-black ${
                    itemView === "grid"
                      ? "!bg-gray-500 !text-white opacity-85"
                      : "text-[#3d3d3d]"
                  }`}
                >
                  <IoGrid size={"18px"} />
                </Button>
                <span className="text-[14px] text-gray-500 font-[500] pl-3">
                  There are {productsData?.length} products
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
                    {sortBy === "sales-desc"
                      ? "Sales, highest to lowest"
                      : sortBy === "relevance"
                      ? "Relevance"
                      : sortBy === "name-asc"
                      ? "Name, A to Z"
                      : sortBy === "name-desc"
                      ? "Name, Z to A"
                      : sortBy === "price-asc"
                      ? "Price, low to high"
                      : "Price, high to low"}
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => handleClose(null)}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      onClick={() => handleClose("sales-desc")}
                      className="!text-[14px]"
                    >
                      Sales, highest to lowest
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClose("relevance")}
                      className="!text-[14px]"
                    >
                      Relevance
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClose("name-asc")}
                      className="!text-[14px]"
                    >
                      Name, A to Z
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClose("name-desc")}
                      className="!text-[14px]"
                    >
                      Name, Z to A
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClose("price-asc")}
                      className="!text-[14px]"
                    >
                      Price, low to high
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleClose("price-desc")}
                      className="!text-[14px]"
                    >
                      Price, high to low
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
            {isLoading ? (
              <ProductSkelton itemView={itemView} length={limit} />
            ) : (
              sortedProducts?.length > 0 && (
                <div
                  className={`flex items-start ${
                    itemView === "list" ? "flex-col" : "flex-row"
                  } justify-start flex-wrap gap-6`}
                >
                  {sortedProducts?.map((product) =>
                    itemView === "grid" ? (
                      <ProductItem key={product?._id} product={product} />
                    ) : (
                      <ProductItemListView
                        key={product?._id}
                        product={product}
                      />
                    )
                  )}
                </div>
              )
            )}
            {totalPages > 1 && (
              <div className="flex items-end justify-end mb-2 mt-10 pagination-btn">
                <Pagination
                  count={totalPages}
                  page={page}
                  variant="outlined"
                  onChange={(e, value) => setPage(value)}
                  shape="rounded"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductList;