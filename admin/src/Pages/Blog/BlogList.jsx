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

import toast from "react-hot-toast";
import { deleteData, getData } from "../../utils/api";
import { MyContext } from "../../App";
import { AiOutlineEdit } from "react-icons/ai";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "image", label: "IMAGE", minWidth: 100 },
  { id: "title", label: "TITLE", minWidth: 300 },
  { id: "content", label: "CONTENT", minWidth: 300 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

function BlogList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [blogsData, setBlogsData] = useState([]);
  const [sortedIds, setSortedIds] = useState([]);

  const context = useContext(MyContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getBlogs = () => {
    getData(`/api/blogs/`).then((res) => {
      if (res?.success === true) {
        const blogArr = [];
        for (let i = 0; i < res?.blogs?.length; i++) {
            blogArr[i] = res?.blogs[i];
            blogArr[i].checked = false;
        }
        setBlogsData(blogArr);
      }
    });
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    const updatedItems = blogsData.map((blog) => ({
      ...blog,
      checked: isChecked,
    }));
    setBlogsData(updatedItems);

    if (isChecked) {
      const ids = updatedItems.map((item) => item._id).sort((a, b) => a - b);
      setSortedIds(ids);
    } else {
      setSortedIds([]);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [context?.isOpenFullScreenPannel]);

  const handleDeleteBlog = (id) => {
    deleteData(`/api/blogs/${id}`, { withCredentials: true }).then((res) => {
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        setBlogsData(blogsData.filter((blog) => blog?._id !== id));
      }
    });
  };

  const handleCheckboxChange = (e, slideId) => {
    const updatedItems = blogsData?.map((blog) =>
      blog?._id === slideId ? { ...blog, checked: !blog.checked } : blog
    );
    setBlogsData(updatedItems);

    const selectedIds = updatedItems
      .filter((item) => item.checked)
      .map((item) => item._id)
      .sort((a, b) => a - b);
    setSortedIds(selectedIds);
  };

  const handleDeleteMultipleBlogs = () => {
    if (sortedIds.length === 0) {
      toast.error("Please select blogs to delete!");
      return;
    }
    deleteMultipleData("/api/blogs/deleteMultiple", sortedIds, {
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        getBlogs();
      }
    });
  };
  return (
    <>
      <div className="flex items-center px-2 py-0 mt-3 justify-between">
        <h2 className="text-[20px] font-[600]">Blogs</h2>
        <div className="col flex items-center justify-end gap-3 ml-auto">
          {sortedIds.length > 0 && (
            <Button
              onClick={handleDeleteMultipleBlogs}
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
                model: "Create Blog",
              })
            }
            className="!bg-blue-600 !font-medium !py-[6px]  !text-[13px] !px-[14px] !text-white gap-2 !capitalize"
          >
            <FaPlus /> Create New Blog
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
                      blogsData?.length > 0 &&
                      blogsData.every((blog) => blog.checked)
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
            {blogsData?.length > 0 && (
              <TableBody>
                {blogsData?.map((blog) => {
                  return (
                    <TableRow key={blog?._id}>
                      <TableCell width={60}>
                        <Checkbox
                          onChange={(e) => handleCheckboxChange(e, blog?._id)}
                          checked={blog?.checked}
                          {...label}
                          size="small"
                        />
                      </TableCell>
                      <TableCell width={columns.minWidth}>
                        <div className="img-section w-[300px] rounded-md overflow-hidden group">
                          <Link to="/products/1342421" data-discover="true">
                            <img
                              className="group-hover:scale-110 max-h-[100px] object-center w-full transition-all object-cover"
                              src={blog?.images?.[0]}
                              alt=""
                            />
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell width={columns.minWidth}>
                        <h4 className="font-[600] text-gray-600 text-[13px] mb-2">
                          {blog?.title}
                        </h4>
                      </TableCell>
                      <TableCell width={columns.minWidth}>
                        <div className="text-gray-600" dangerouslySetInnerHTML={{__html: blog?.content?.substr(0, 250).concat('...')}} />
                      </TableCell>
                      <TableCell width={columns.minWidth}>
                        <div className="flex items-center justify-start gap-1">
                          <TooltipMui title="Edit Blog" placement="top">
                            <Button
                              onClick={() =>
                                context?.setIsOpenFullScreenPannel({
                                  open: true,
                                  model: "Edit Blog",
                                  id: blog?._id,
                                })
                              }
                              className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500"
                            >
                              <AiOutlineEdit size={"22px"} />
                            </Button>
                          </TooltipMui>
                          <TooltipMui title="Remove blog" placement="top">
                            <Button
                              onClick={() => handleDeleteBlog(blog?._id)}
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

export default BlogList;
