import { Button } from "@mui/material";
import React, { useContext, useState } from "react";

import { FaPlus, FaRegEye } from "react-icons/fa6";
import { BiExport } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import ProgressBar from "../Components/ProgressBar";
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
import ProductSearchbox from "../Components/ProductSearchbox";
import { MyContext } from "../App";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "image", label: "IMAGE", minWidth: 250 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

function HomeSliderBanners() {
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const context = useContext(MyContext)

  const handleChangeCatFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className="flex items-center px-2 py-0 mt-3 justify-between">
        <h2 className="text-[20px] font-[600]">Home Slider Banners</h2>
        <div className="col flex items-center justify-end gap-3 ml-auto">
            <Button className="!bg-green-600 !font-medium !py-[6px] !text-[13px]  !px-[14px] !text-white !flex !items-center gap-2 !capitalize">
              <BiExport className="mb-1" size={"16px"} /> Export
            </Button>
            <Button onClick={() => context.setIsOpenFullScreenPannel({open: true, model: 'Add Home Slide'})} className="!bg-blue-600 !font-medium !py-[6px]  !text-[13px] !px-[14px] !text-white gap-2 !capitalize">
              <FaPlus /> Add Home Slide
            </Button>
          </div>
      </div>
      <div className="card bg-white overflow-hidden shadow-md sm:rounded-lg rounded-md border my-4 border-gray-200 hover:border-gray-400 transition-all">
        
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow className="!bg-gray-500">
                <TableCell>
                  <Checkbox {...label} size="small" />
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
              <TableRow>
                <TableCell width={60}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell width={columns.minWidth }>
                    <div className="img-section w-[300px] rounded-md overflow-hidden group">
                      <Link to="/products/1342421" data-discover="true">
                        <img
                          className="w-full group-hover:scale-110 transition-all h-full object-cover"
                          src="https://api.spicezgold.com/download/file_1734524971122_NewProject(8).jpg"
                          alt=""
                        />
                      </Link>
                  </div>
                </TableCell>
                <TableCell width={columns.minWidth }>
                  <div className="flex items-center gap-1">
                    <TooltipMui title="Edit Product" placement="top">
                      <Button className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
                        <AiOutlineEdit size={"22px"} />
                      </Button>
                    </TooltipMui>
                    <TooltipMui title="View Product Details" placement="top">
                      <Button className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
                        <FaRegEye size={"16px"} />
                      </Button>
                    </TooltipMui>
                    <TooltipMui title="Remove Product" placement="top">
                      <Button className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
                        <GoTrash size={"16px"} />
                      </Button>
                    </TooltipMui>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell width={60}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell width={columns.minWidth }>
                    <div className="img-section w-[300px] rounded-md overflow-hidden group">
                      <Link to="/products/1342421" data-discover="true">
                        <img
                          className="w-full group-hover:scale-110 transition-all h-full object-cover"
                          src="https://api.spicezgold.com/download/file_1734524930884_NewProject(6).jpg"
                          alt=""
                        />
                      </Link>
                  </div>
                </TableCell>
                <TableCell width={columns.minWidth }>
                  <div className="flex items-center gap-1">
                    <TooltipMui title="Edit Product" placement="top">
                      <Button className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
                        <AiOutlineEdit size={"22px"} />
                      </Button>
                    </TooltipMui>
                    <TooltipMui title="View Product Details" placement="top">
                      <Button className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
                        <FaRegEye size={"16px"} />
                      </Button>
                    </TooltipMui>
                    <TooltipMui title="Remove Product" placement="top">
                      <Button className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
                        <GoTrash size={"16px"} />
                      </Button>
                    </TooltipMui>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell width={60}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell width={columns.minWidth }>
                    <div className="img-section w-[300px] rounded-md overflow-hidden group">
                      <Link to="/products/1342421" data-discover="true">
                        <img
                          className="w-full group-hover:scale-110 transition-all h-full object-cover"
                          src="https://api.spicezgold.com/download/file_1734525002307_1723967638078_slideBanner1.6bbeed1a0c8ffb494f7c.jpg"
                          alt=""
                        />
                      </Link>
                  </div>
                </TableCell>
                <TableCell width={columns.minWidth }>
                  <div className="flex items-center gap-1">
                    <TooltipMui title="Edit Product" placement="top">
                      <Button className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
                        <AiOutlineEdit size={"22px"} />
                      </Button>
                    </TooltipMui>
                    <TooltipMui title="View Product Details" placement="top">
                      <Button className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
                        <FaRegEye size={"16px"} />
                      </Button>
                    </TooltipMui>
                    <TooltipMui title="Remove Product" placement="top">
                      <Button className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
                        <GoTrash size={"16px"} />
                      </Button>
                    </TooltipMui>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell width={60}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell width={columns.minWidth }>
                    <div className="img-section w-[300px] rounded-md overflow-hidden group">
                      <Link to="/products/1342421" data-discover="true">
                        <img
                          className="w-full group-hover:scale-110 transition-all h-full object-cover"
                          src="https://api.spicezgold.com/download/file_1734524958576_NewProject(10).jpg"
                          alt=""
                        />
                      </Link>
                  </div>
                </TableCell>
                <TableCell width={columns.minWidth }>
                  <div className="flex items-center gap-1">
                    <TooltipMui title="Edit Product" placement="top">
                      <Button className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
                        <AiOutlineEdit size={"22px"} />
                      </Button>
                    </TooltipMui>
                    <TooltipMui title="View Product Details" placement="top">
                      <Button className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
                        <FaRegEye size={"16px"} />
                      </Button>
                    </TooltipMui>
                    <TooltipMui title="Remove Product" placement="top">
                      <Button className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
                        <GoTrash size={"16px"} />
                      </Button>
                    </TooltipMui>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell width={60}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell width={columns.minWidth }>
                    <div className="img-section w-[300px] rounded-md overflow-hidden group">
                      <Link to="/products/1342421" data-discover="true">
                        <img
                          className="w-full group-hover:scale-110 transition-all h-full object-cover"
                          src="https://api.spicezgold.com/download/file_1734524878924_1721277298204_banner.jpg"
                          alt=""
                        />
                      </Link>
                  </div>
                </TableCell>
                <TableCell width={columns.minWidth }>
                  <div className="flex items-center gap-1">
                    <TooltipMui title="Edit Product" placement="top">
                      <Button className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
                        <AiOutlineEdit size={"22px"} />
                      </Button>
                    </TooltipMui>
                    <TooltipMui title="View Product Details" placement="top">
                      <Button className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
                        <FaRegEye size={"16px"} />
                      </Button>
                    </TooltipMui>
                    <TooltipMui title="Remove Product" placement="top">
                      <Button className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
                        <GoTrash size={"16px"} />
                      </Button>
                    </TooltipMui>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
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

export default HomeSliderBanners;
