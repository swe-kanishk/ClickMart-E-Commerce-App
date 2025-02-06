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

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "catImage", label: "CATEGORY IMAGE", minWidth: 100 },
  { id: "catName", label: "CATEGORY NAME", minWidth: 100 },
  { id: "subCatName", label: "SUB CATEGORY NAME", minWidth: 400 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

function SubCategoryList() {
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const context = useContext(MyContext);

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
        <h2 className="text-[20px] font-[600]">Sub Category List</h2>
        <div className="col flex items-center justify-end gap-3 ml-auto">
          <Button className="!bg-green-600 !font-medium !py-[6px] !text-[13px]  !px-[14px] !text-white !flex !items-center gap-2 !capitalize">
            <BiExport className="mb-1" size={"16px"} /> Export
          </Button>
          <Button
            onClick={() =>
              context.setIsOpenFullScreenPannel({
                open: true,
                model: "Add New Sub Category",
              })
            }
            className="!bg-blue-600 !font-medium !py-[6px]  !text-[13px] !px-[14px] !text-white gap-2 !capitalize"
          >
            <FaPlus /> Add New Sub Category
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
                <TableCell width={columns.minWidth}>
                  <div className="img-section w-[80px] rounded-md overflow-hidden group">
                    <Link to="/products/1342421" data-discover="true">
                      <img
                        className="w-full group-hover:scale-110 transition-all h-full object-cover"
                        src="https://api.spicezgold.com/download/file_1734525275367_well.png"
                        alt=""
                      />
                    </Link>
                  </div>
                </TableCell>
                <TableCell width={columns.minWidth}>
                  <span>Fashion</span>
                </TableCell>
                <TableCell width={columns.minWidth}>
                  <Stack direction="row" spacing={1}>
                    <Chip label="Kids" color="primary" onClick={handleClick} />
                    <Chip label="Male" color="primary" onClick={handleClick} />
                    <Chip label="Female" color="primary" onClick={handleClick} />
                  </Stack>
                </TableCell>
                <TableCell width={columns.minWidth}>
                  <div className="flex items-center gap-1">
                    <TooltipMui title="Edit Product" placement="top">
                      <Button className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
                        <AiOutlineEdit size={"22px"} />
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
                <TableCell width={columns.minWidth}>
                  <div className="img-section w-[80px] rounded-md overflow-hidden group">
                    <Link to="/products/1342421" data-discover="true">
                      <img
                        className="w-full group-hover:scale-110 transition-all h-full object-cover"
                        src="https://api.spicezgold.com/download/file_1734525286186_jw.png"
                        alt=""
                      />
                    </Link>
                  </div>
                </TableCell>
                <TableCell width={columns.minWidth}>
                  <span>Fashion</span>
                </TableCell>
                <TableCell width={columns.minWidth}>
                  <Stack direction="row" spacing={1}>
                    <Chip label="Kids" color="primary" onClick={handleClick} />
                    <Chip label="Male" color="primary" onClick={handleClick} />
                    <Chip label="Female" color="primary" onClick={handleClick} />
                  </Stack>
                </TableCell>
                <TableCell width={columns.minWidth}>
                  <div className="flex items-center gap-1">
                    <TooltipMui title="Edit Product" placement="top">
                      <Button className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
                        <AiOutlineEdit size={"22px"} />
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
                <TableCell width={columns.minWidth}>
                  <div className="img-section w-[80px] rounded-md overflow-hidden group">
                    <Link to="/products/1342421" data-discover="true">
                      <img
                        className="w-full group-hover:scale-110 transition-all h-full object-cover"
                        src="https://api.spicezgold.com/download/file_1734525239704_foot.png"
                        alt=""
                      />
                    </Link>
                  </div>
                </TableCell>
                <TableCell width={columns.minWidth}>
                  <span>Fashion</span>
                </TableCell>
                <TableCell width={columns.minWidth}>
                  <Stack direction="row" spacing={1}>
                    <Chip label="Kids" color="primary" onClick={handleClick} />
                    <Chip label="Male" color="primary" onClick={handleClick} />
                    <Chip label="Female" color="primary" onClick={handleClick} />
                  </Stack>
                </TableCell>
                <TableCell width={columns.minWidth}>
                  <div className="flex items-center gap-1">
                    <TooltipMui title="Edit Product" placement="top">
                      <Button className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
                        <AiOutlineEdit size={"22px"} />
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
                <TableCell width={columns.minWidth}>
                  <div className="img-section w-[80px] rounded-md overflow-hidden group">
                    <Link to="/products/1342421" data-discover="true">
                      <img
                        className="w-full group-hover:scale-110 transition-all h-full object-cover"
                        src="https://api.spicezgold.com/download/file_1734525255799_beauty.png"
                        alt=""
                      />
                    </Link>
                  </div>
                </TableCell>
                <TableCell width={columns.minWidth}>
                  <span>Fashion</span>
                </TableCell>
                <TableCell width={columns.minWidth}>
                  <Stack direction="row" spacing={1}>
                    <Chip label="Kids" color="primary" onClick={handleClick} />
                    <Chip label="Male" color="primary" onClick={handleClick} />
                    <Chip label="Female" color="primary" onClick={handleClick} />
                  </Stack>
                </TableCell>
                <TableCell width={columns.minWidth}>
                  <div className="flex items-center gap-1">
                    <TooltipMui title="Edit Product" placement="top">
                      <Button className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
                        <AiOutlineEdit size={"22px"} />
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
                <TableCell width={columns.minWidth}>
                  <div className="img-section w-[80px] rounded-md overflow-hidden group">
                    <Link to="/products/1342421" data-discover="true">
                      <img
                        className="w-full group-hover:scale-110 transition-all h-full object-cover"
                        src="https://api.spicezgold.com/download/file_1734525248057_gro.png"
                        alt=""
                      />
                    </Link>
                  </div>
                </TableCell>
                <TableCell width={columns.minWidth}>
                  <span>Fashion</span>
                </TableCell>
                <TableCell width={columns.minWidth}>
                  <Stack direction="row" spacing={1}>
                    <Chip label="Kids" color="primary" onClick={handleClick} />
                    <Chip label="Male" color="primary" onClick={handleClick} />
                    <Chip label="Female" color="primary" onClick={handleClick} />
                  </Stack>
                </TableCell>
                <TableCell width={columns.minWidth}>
                  <div className="flex items-center gap-1">
                    <TooltipMui title="Edit Product" placement="top">
                      <Button className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
                        <AiOutlineEdit size={"22px"} />
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

export default SubCategoryList;
