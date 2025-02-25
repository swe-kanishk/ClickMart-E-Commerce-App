import { Button } from "@mui/material";
import React, { useContext, useState } from "react";

import { FaPlus, FaRegEye } from "react-icons/fa6";
import { BiExport } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
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
import toast from 'react-hot-toast';

import { MyContext } from "../../App";
import { useEffect } from "react";
import { deleteData, getData } from "../../utils/api";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "image", label: "IMAGE", minWidth: 150 },
  { id: "catName", label: "CATEGORY NAME", minWidth: 150 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

function CategoryList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categoryData, setCategoryData] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    getData("/api/category").then((res) => {
      if (res?.success === true) {
        setCategoryData(res?.data);
      }
    });
  }, [context?.isOpenFullScreenPannel]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteCat = (id) => {
    deleteData(`/api/category/${id}`).then((res) => {
      console.log(res)
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        setCategoryData((prevState) =>
          prevState.filter((cat) => cat?._id !== id)
        );
      }
    }
    );
  }

  return (
    <>
      <div className="flex items-center px-2 py-0 mt-3 justify-between">
        <h2 className="text-[20px] font-[600]">Category List</h2>
        <div className="col flex items-center justify-end gap-3 ml-auto">
          <Button className="!bg-green-600 !font-medium !py-[6px] !text-[13px]  !px-[14px] !text-white !flex !items-center gap-2 !capitalize">
            <BiExport className="mb-1" size={"16px"} /> Export
          </Button>
          <Button
            onClick={() =>
              context.setIsOpenFullScreenPannel({
                open: true,
                model: "Add New Category",
              })
            }
            className="!bg-blue-600 !font-medium !py-[6px]  !text-[13px] !px-[14px] !text-white gap-2 !capitalize"
          >
            <FaPlus /> Add New Category
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
              {categoryData.length > 0 &&
                categoryData?.map((cat) => {
                  return (
                    <TableRow key={cat?._id}>
                      <TableCell width={60}>
                        <Checkbox {...label} size="small" />
                      </TableCell>
                      <TableCell width={columns.minWidth}>
                        <div className="img-section w-[80px] rounded-md overflow-hidden group">
                          <Link to="/products/1342421" data-discover="true">
                            <img
                              className="w-full group-hover:scale-110 transition-all object-cover"
                              src={cat?.images}
                              alt=""
                            />
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell width={columns.minWidth}>
                        {cat?.name}
                      </TableCell>
                      <TableCell width={columns.minWidth}>
                        <div className="flex items-center gap-1">
                          <TooltipMui title="Edit Product" placement="top">
                            <Button
                              onClick={() =>
                                context.setIsOpenFullScreenPannel({
                                  open: true,
                                  model: "Edit Category",
                                  id: cat?._id,
                                })
                              }
                              className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500"
                            >
                              <AiOutlineEdit size={"22px"} />
                            </Button>
                          </TooltipMui>
                          <TooltipMui title="Remove Product" placement="top">
                            <Button onClick={() => handleDeleteCat(cat?._id)} className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500">
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

export default CategoryList;
