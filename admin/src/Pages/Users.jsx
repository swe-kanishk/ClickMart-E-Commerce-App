import React, { useContext, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import ProductSearchbox from "../Components/ProductSearchbox";
import { MyContext } from "../App";
import { IoMailUnreadOutline } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "userImg", label: "USER IMAGE", minWidth: 80 },
  { id: "username", label: "USERNAME", minWidth: 100 },
  {
    id: "userEmail",
    label: "USER EMAIL",
    minWidth: 150,
  },
  {
    id: "userPhone",
    label: "USER PHONE NO",
    minWidth: 130,
  },
];

function Users() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const context = useContext(MyContext);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className="card bg-white overflow-hidden shadow-md sm:rounded-lg rounded-md border my-4 border-gray-200 hover:border-gray-400 transition-all">
        <div className="flex items-center w-full px-5 py-2 justify-between">
          <div className="col w-[20%]">
            <h2 className="text-[20px] font-[600]">Users List</h2>
          </div>
          <div className="col w-[30%] ml-auto">
            <ProductSearchbox />
          </div>
        </div>
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
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img-section w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/products/1342421" data-discover="true">
                        <img
                          className="w-full group-hover:scale-110 transition-all h-full object-cover"
                          src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2523"
                          alt=""
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Kanishk Tiwari
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center"><IoMailUnreadOutline size={'18px'} /> cse.kanishkk@gmail.com</span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2"><MdLocalPhone /> (+91)-9832934232</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img-section w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/products/1342421" data-discover="true">
                        <img
                          className="w-full group-hover:scale-110 transition-all h-full object-cover"
                          src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2523"
                          alt=""
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Kanishk Tiwari
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center"><IoMailUnreadOutline size={'18px'} /> cse.kanishkk@gmail.com</span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2"><MdLocalPhone /> (+91)-9832934232</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img-section w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/products/1342421" data-discover="true">
                        <img
                          className="w-full group-hover:scale-110 transition-all h-full object-cover"
                          src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2523"
                          alt=""
                        />
                      </Link>
                    </div>
                  </div>{" "}
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Kanishk Tiwari
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center"><IoMailUnreadOutline size={'18px'} /> cse.kanishkk@gmail.com</span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2"><MdLocalPhone /> (+91)-9832934232</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img-section w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/products/1342421" data-discover="true">
                        <img
                          className="w-full group-hover:scale-110 transition-all h-full object-cover"
                          src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2523"
                          alt=""
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Kanishk Tiwari
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center"><IoMailUnreadOutline size={'18px'} /> cse.kanishkk@gmail.com</span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2"><MdLocalPhone /> (+91)-9832934232</span>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px]">
                    {" "}
                    <div className="img-section w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/products/1342421" data-discover="true">
                        <img
                          className="w-full group-hover:scale-110 transition-all h-full object-cover"
                          src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2523"
                          alt=""
                        />
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Kanishk Tiwari
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex gap-2 items-center"><IoMailUnreadOutline size={'18px'} /> cse.kanishkk@gmail.com</span>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <span className="flex items-center gap-2"><MdLocalPhone /> (+91)-9832934232</span>
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

export default Users;
