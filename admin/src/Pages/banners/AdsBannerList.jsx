import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import { FaPlus } from "react-icons/fa6";
import { BiExport } from "react-icons/bi";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import TooltipMui from "@mui/material/Tooltip";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { MyContext } from "../../App";
import { deleteData, deleteMultipleData, getData } from "../../utils/api";
import toast from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "image", label: "IMAGE", minWidth: 250 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

function AdsBannerList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [adsBannerData, setAdsBannerData] = useState([]);
  const [sortedIds, setSortedIds] = useState([]);

  const context = useContext(MyContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getBanners = () => {
    getData(`/api/adsBanner/`).then((res) => {
      if (res?.success === true) {
        const bannersArr = [];
        for (let i = 0; i < res?.banners?.length; i++) {
          bannersArr[i] = res?.banners[i];
          bannersArr[i].checked = false;
        }
        setAdsBannerData(bannersArr);
      }
    });
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const updatedItems = adsBannerData.map((banner) => ({
      ...banner,
      checked: isChecked,
    }));
    setAdsBannerData(updatedItems);

    if (isChecked) {
      const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);
      setSortedIds(ids);
    } else {
      setSortedIds([]);
    }
  };

  useEffect(() => {
    getBanners();
  }, [context?.isOpenFullScreenPannel]);

  const handleDeleteBanner = (id) => {
    deleteData(`/api/adsBanner/${id}`, { withCredentials: true }).then(
      (res) => {
        if (res?.data?.success === true) {
          toast.success(res?.data?.message);
          setAdsBannerData(
            adsBannerData.filter((banner) => banner?._id !== id)
          );
        }
      }
    );
  };

  const handleCheckboxChange = (e, slideId) => {
    const updatedItems = adsBannerData?.map((banner) =>
      banner?._id === slideId ? { ...banner, checked: !banner.checked } : banner
    );
    setAdsBannerData(updatedItems);

    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIds(selectedIds);
  };

  const handleDeleteMultipleSlides = () => {
    if (sortedIds.length === 0) {
      toast.error("Please select banners to delete!");
      return;
    }
    deleteMultipleData("/api/homeSlides/deleteMultiple", sortedIds, {
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        getSlides();
      }
    });
  };
  return (
    <>
      <div className="flex items-center px-2 py-0 mt-3 justify-between">
        <h2 className="text-[20px] font-[600]">Ads Banners List</h2>
        <div className="col flex items-center justify-end gap-3 ml-auto">
          {sortedIds.length > 0 && (
            <Button
              onClick={handleDeleteMultipleSlides}
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
                model: "Add Ads Banner",
              })
            }
            className="!bg-blue-600 !font-medium !py-[6px]  !text-[13px] !px-[14px] !text-white gap-2 !capitalize"
          >
            <FaPlus /> Add Ads Banner
          </Button>
        </div>
      </div>
      <div className="card bg-white overflow-hidden shadow-md sm:rounded-lg rounded-md border my-4 border-gray-200 hover:border-gray-400 transition-all">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className="!bg-gray-500">
                <TableCell>
                  <Checkbox
                    onClick={handleSelectAll}
                    checked={
                      adsBannerData?.length > 0 &&
                      adsBannerData.every((banner) => banner.checked)
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
            {adsBannerData?.length > 0 && (
              <TableBody>
                {adsBannerData?.map((banner) => {
                  return (
                    <TableRow key={banner?._id}>
                      <TableCell width={60}>
                        <Checkbox
                          onChange={(e) => handleCheckboxChange(e, banner?._id)}
                          checked={banner?.checked}
                          {...label}
                          size="small"
                        />
                      </TableCell>
                      <TableCell width={columns.minWidth}>
                        <div className="img-section w-[200px] max-h-[100px] rounded-md overflow-hidden group">
                          <Link to="/products/1342421" data-discover="true">
                            <img
                              className="w-full group-hover:scale-110 transition-all h-full object-cover"
                              src={banner?.images?.[0]}
                              alt=""
                            />
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell width={columns.minWidth}>
                        <div className="flex items-center justify-start gap-1">
                          <TooltipMui title="Edit Ads Banner" placement="top">
                            <Button
                              onClick={() =>
                                context.setIsOpenFullScreenPannel({
                                  open: true,
                                  model: "Edit Ads Banner",
                                  id: banner?._id,
                                })
                              }
                              className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500"
                            >
                              <AiOutlineEdit size={"22px"} />
                            </Button>
                          </TooltipMui>
                          <TooltipMui title="Remove Ads Banner" placement="top">
                            <Button
                              onClick={() => handleDeleteBanner(banner?._id)}
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
            )}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={10}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}

export default AdsBannerList;
