import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import { FaPlus, FaRegEye } from "react-icons/fa6";
import { BiExport } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import ProgressBar from "../../Components/ProgressBar";
import { GoTrash } from "react-icons/go";
import TooltipMui from "@mui/material/Tooltip";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ProductSearchbox from "../../Components/ProductSearchbox";
import { MyContext } from "../../App";
import { deleteData, deleteMultipleData, getData } from "../../utils/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import toast from "react-hot-toast";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "product", label: "PRODUCT", minWidth: 150 },
  { id: "category", label: "CATEGORY", minWidth: 100 },
  {
    id: "subCategory",
    label: "SUB CATEGORY",
    minWidth: 150,
  },
  {
    id: "price",
    label: "PRICE",
    minWidth: 130,
  },
  {
    id: "sales",
    label: "SALES",
    minWidth: 100,
  },
  {
    id: "action",
    label: "ACTION",
    minWidth: 100,
  },
];

function Products() {
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdSubCat, setProductThirdSubCat] = useState("");

  const [productsData, setProductsData] = useState([]);
  const [sortedIds, setSortedIds] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const context = useContext(MyContext);

  const getProducts = () => {
    getData(`/api/product/?page=${page}&perPage=${rowsPerPage}`).then((res) => {
      if (res?.success === true) {
        const productsArr = [];
        for (let i = 0; i < res?.data?.length; i++) {
          productsArr[i] = res?.data[i];
          productsArr[i].checked = false;
        }
        setProductsData(productsArr);
      }
    });
  };

  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPannel]);

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    getData(`/api/product/getAllProductsByCatId/${event.target.value}`).then(
      (res) => {
        if (res?.success === true) {
          setProductsData(res?.data);
        }
      }
    );
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    getData(`/api/product/getAllProductsBySubCatId/${event.target.value}`).then(
      (res) => {
        if (res?.success === true) {
          setProductsData(res?.data);
        }
      }
    );
  };

  const handleChangeProductThirdSubCat = (event) => {
    setProductThirdSubCat(event.target.value);
    getData(
      `/api/product/getAllProductsByThirdLevelCatId/${event.target.value}`
    ).then((res) => {
      if (res?.success === true) {
        setProductsData(res?.data);
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteProduct = (id) => {
    deleteData(`/api/product/${id}`, { withCredentials: true }).then((res) => {
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        setProductsData(productsData.filter((product) => product?._id !== id));
      }
    });
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const updatedItems = productsData.map((product) => ({
      ...product,
      checked: isChecked,
    }));
    setProductsData(updatedItems);

    if (isChecked) {
      const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);
      setSortedIds(ids);
    } else {
      setSortedIds([]);
    }
  };

  const handleCheckboxChange = (e, productId) => {
    const updatedItems = productsData.map((product) =>
      product._id === productId
        ? { ...product, checked: !product.checked }
        : product
    );
    setProductsData(updatedItems);

    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIds(selectedIds);
  };

  const handleDeleteMultipleProducts = () => {
    if (sortedIds.length === 0) {
      toast.error("Please select products to delete!");
      return;
    }
    deleteMultipleData("/api/product/deleteMultiple", sortedIds, {
      withCredentials: true,
    }).then((res) => {
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        getProducts();
      }
    });
  };

  return (
    <>
      <div className="flex items-center px-2 py-0 mt-3 justify-between">
        <h2 className="text-[20px] font-[600]">Products</h2>
        <div className="col flex items-center justify-end gap-3 ml-auto">
          {sortedIds.length > 0 && (
            <Button
              onClick={handleDeleteMultipleProducts}
              className="!bg-red-500 hover:!bg-red-600 !font-medium !py-[6px] !text-[13px]  !px-[14px] !text-white !flex !items-center gap-2 !capitalize"
            >
              <GoTrash className="mb-1" size={"16px"} /> Delete
            </Button>
          )}
          <Button className="!bg-green-600 !font-medium !py-[6px] !text-[13px]  !px-[14px] !text-white !flex !items-center gap-2 !capitalize">
            <BiExport className="mb-1" size={"16px"} /> Export
          </Button>
          <Button
            onClick={() =>
              context.setIsOpenFullScreenPannel({
                open: true,
                model: "Add Product",
              })
            }
            className="!bg-blue-600 !font-medium !py-[6px]  !text-[13px] !px-[14px] !text-white gap-2 !capitalize"
          >
            <FaPlus /> Add Product
          </Button>
        </div>
      </div>
      <div className="card bg-white overflow-hidden shadow-md sm:rounded-lg rounded-md border my-4 border-gray-200 hover:border-gray-400 transition-all">
        <div className="flex items-center w-full px-5 py-2 gap-6 pb-3 justify-between">
          <div className="col w-[15%]">
            <h4 className="font-[600] text-[13px] mb-2">Category By</h4>
            <Select
              className="w-full"
              size="small"
              style={{ zoom: "80%" }}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={productCat}
              onChange={handleChangeProductCat}
              label="Category"
            >
              {context?.categoryData?.length > 0 &&
                context?.categoryData?.map((category) => {
                  return (
                    <MenuItem key={category?._id} value={category?._id}>
                      {category?.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </div>
          <div className="col w-[15%]">
            <h4 className="font-[600] text-[13px] mb-2">Sub Category By</h4>
            <Select
              className="w-full"
              size="small"
              style={{ zoom: "80%" }}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={productSubCat}
              onChange={handleChangeProductSubCat}
              label="Category"
            >
              {context?.categoryData?.length > 0 &&
                context?.categoryData?.map((category) => {
                  return (
                    category?.children?.length > 0 &&
                    category?.children?.map((subCat) => {
                      return (
                        <MenuItem key={subCat?._id} value={subCat?._id}>
                          {subCat?.name}
                        </MenuItem>
                      );
                    })
                  );
                })}
            </Select>
          </div>
          <div className="col w-[15%]">
            <h4 className="font-[600] text-[13px] mb-2">
              Third Level Category By
            </h4>
            <Select
              className="w-full"
              size="small"
              style={{ zoom: "80%" }}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={productThirdSubCat}
              onChange={handleChangeProductThirdSubCat}
              label="Category"
            >
              {context?.categoryData?.length > 0 &&
                context?.categoryData?.map((category) => {
                  return (
                    category?.children?.length > 0 &&
                    category?.children?.map((subCat) => {
                      return (
                        subCat?.children?.length > 0 &&
                        subCat?.children?.map((thirdSubCat) => {
                          return (
                            <MenuItem
                              key={thirdSubCat?._id}
                              value={thirdSubCat?._id}
                            >
                              {thirdSubCat?.name}
                            </MenuItem>
                          );
                        })
                      );
                    })
                  );
                })}
            </Select>
          </div>
          <div className="col w-[20%] ml-auto">
            <ProductSearchbox />
          </div>
        </div>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className="!bg-gray-500">
                <TableCell>
                  <Checkbox
                    onChange={handleSelectAll}
                    checked={
                      productsData?.length > 0 &&
                      productsData.every((product) => product.checked)
                    }
                    {...label}
                    size="small"
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {productsData?.length > 0 &&
                productsData?.map((product) => {
                  return (
                    <TableRow key={product?._id}>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        <Checkbox
                          onChange={(e) =>
                            handleCheckboxChange(e, product?._id)
                          }
                          checked={product?.checked}
                          {...label}
                          size="small"
                        />
                      </TableCell>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        <div className="flex items-center gap-4 w-[300px]">
                          <div className="img-section w-[65px] h-[65px] rounded-md overflow-hidden group">
                            <Link
                              to={`/products/${product?._id}`}
                              data-discover="true"
                            >
                              <LazyLoadImage
                                alt={"productImage"}
                                className="w-full group-hover:scale-110 !transition-all h-full object-cover"
                                effect="blur"
                                src={product?.images[0]}
                                wrapperProps={{
                                  style: { transitionDelay: "1s" },
                                }}
                              />
                            </Link>
                          </div>
                          <div className="info w-[75%]">
                            <h3 className="font-[500] hover:text-primary text-gray-800 leading-4 text-[12px]">
                              <Link
                                to={`/products/${product?._id}`}
                                data-discover="true"
                              >
                                {product?.name}
                              </Link>
                            </h3>
                            <span className="text-[12px]">Zara</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        {product?.catName}
                      </TableCell>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        {product?.subCatName}
                      </TableCell>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        <div className="flex flex-col items-start">
                          <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                            &#8377; {product?.oldPrice}
                          </span>
                          <span className="price text-primary text-[14px] font-[600]">
                            &#8377; {product?.price}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        <p className="text-[14px] w-[100px]">
                          <span className="font-[600]">{product?.sale}</span>{" "}
                          Sale
                        </p>
                        <ProgressBar value={40} type="success" />
                      </TableCell>
                      <TableCell style={{ minWidth: columns.minWidth }}>
                        <div className="flex items-center justify-start gap-1">
                          <TooltipMui title="Edit Product" placement="top">
                            <Button
                              onClick={() =>
                                context.setIsOpenFullScreenPannel({
                                  open: true,
                                  model: "Edit Product",
                                  id: product?._id,
                                })
                              }
                              className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500"
                            >
                              <AiOutlineEdit size={"22px"} />
                            </Button>
                          </TooltipMui>
                          <TooltipMui
                            title="View Product Details"
                            placement="top"
                          >
                            <Link to={`/product/${product?._id}`}>
                              <Button className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
                                <FaRegEye size={"16px"} />
                              </Button>
                            </Link>
                          </TooltipMui>
                          <TooltipMui title="Remove Product" placement="top">
                            <Button
                              onClick={() => handleDeleteProduct(product?._id)}
                              className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500"
                            >
                              <GoTrash size={"16px"} />
                            </Button>
                          </TooltipMui>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={productsData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}

export default Products;
