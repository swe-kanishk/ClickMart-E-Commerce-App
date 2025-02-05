import React, { useState, PureComponent, useContext } from "react";
import DashBoardBox from "../Components/DashBoardBox";
import { Button } from "@mui/material";
import { FaAngleDown, FaPlus, FaRegEye } from "react-icons/fa6";
import { BiExport } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import ProgressBar from "../Components/ProgressBar";
import { GoTrash } from "react-icons/go";
import TooltipMui from "@mui/material/Tooltip";
import Pagination from "@mui/material/Pagination";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const label = { inputProps: { "aria-label": "Checkbox demo" } };

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MyContext } from "../App";


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

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}


function Dashboard() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const context = useContext(MyContext)

  const [categoryFilterVal, setCategoryFilterVal] = useState('');

  const [chart1Data, setChart1Data] = useState([
    {
      name: 'Jan',
      TotalSales: 4000,
      TotalUsers: 2400,
      amt: 2400,
    },
    {
      name: 'Feb',
      TotalSales: 3000,
      TotalUsers: 1398,
      amt: 2210,
    },
    {
      name: 'Mar',
      TotalSales: 2000,
      TotalUsers: 9800,
      amt: 2290,
    },
    {
      name: 'Apr',
      TotalSales: 2780,
      TotalUsers: 3908,
      amt: 2000,
    },
    {
      name: 'May',
      TotalSales: 1890,
      TotalUsers: 4800,
      amt: 2181,
    },
    {
      name: 'Jun',
      TotalSales: 2390,
      TotalUsers: 3800,
      amt: 2500,
    },
    {
      name: 'Jul',
      TotalSales: 2090,
      TotalUsers: 4300,
      amt: 2100,
    },
    {
      name: 'Aug',
      TotalSales: 3490,
      TotalUsers: 4300,
      amt: 2100,
    },
    {
      name: 'Sep',
      TotalSales: 4490,
      TotalUsers: 2300,
      amt: 2100,
    },
    {
      name: 'Oct',
      TotalSales: 3490,
      TotalUsers: 1300,
      amt: 2100,
    },
    {
      name: 'Nov',
      TotalSales: 3490,
      TotalUsers: 3200,
      amt: 2100,
    },
    {
      name: 'Dec',
      TotalSales: 4490,
      TotalUsers: 6500,
      amt: 2100,
    },
  ]);

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
      <div className="card px-5 py-2 bg-white rounded-md cursor-pointer border flex items-center justify-between gap-8 mb-5 border-gray-200 hover:border-gray-400 transition-all">
        <div className="info">
          <h1 className="text-2xl font-medium leading-10">Good Morning 👋🏼 </h1>
          <p className="text-gray-500 text-[14px] mt-3">
            Here's What happening on your store today. See the statistics at
            once
          </p>
          <Button onClick={() => context.setIsOpenFullScreenPannel({open: true, model: 'Add Product'})} className="!capitalize !bg-black !mt-4 !text-white gap-1">
            <FaPlus size={"17px"} className="text-white" /> Add Product
          </Button>
        </div>
        <img
          src="https://isomorphic-furyroad.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fshop-illustration.b3542492.png&w=3840&q=75"
          width={"200px"}
          alt=""
        />
      </div>

      <DashBoardBox />

      <div className="card bg-white overflow-hidden shadow-md sm:rounded-lg rounded-md border my-4 border-gray-200 hover:border-gray-400 transition-all">
        <div className="flex items-center px-5 py-2 justify-between">
          <h3 className="text-[20px] font-[600]">Products</h3>
        </div>
        <div className="flex items-center w-full px-5 py-2 justify-between">
            <div className="col w-[20%]">
              <h4 className="font-[600] text-[13px] mb-2">Category By</h4>
              <Select
              className="w-full"
              size="small"
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={categoryFilterVal}
          onChange={handleChangeCatFilter}
          label="Category"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Men</MenuItem>
          <MenuItem value={20}>Women</MenuItem>
          <MenuItem value={30}>Kids</MenuItem>
        </Select>
            </div>
            <div className="col flex items-center justify-between gap-3 ml-auto">
              <Button className="!bg-green-600 !font-medium !py-[6px] !text-[13px]  !px-[14px] !text-white !flex !items-center gap-2 !capitalize"><BiExport className="mb-1" size={'16px'} /> Export</Button>
              <Button onClick={() => context.setIsOpenFullScreenPannel({open: true, model: 'Add Product'})} className="!bg-blue-600 !font-medium !py-[6px]  !text-[13px] !px-[14px] !text-white gap-2 !capitalize"><FaPlus /> Add Product</Button>
            </div>
          </div>
        <div className="relative w-full overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100  ">
              <tr>
                <th
                  scope="row"
                  className="px-6 pr-0 py-3 font-medium text-gray-900 whitespace-nowrap "
                >
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </th>
                <th scope="col" className="px-0 whitespace-nowrap py-3">
                  Product
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  Category
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  Sub Category
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  Price
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  Sales
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <td
                  scope="row"
                  className="px-6 pr-0 py-2 font-medium text-gray-900 whitespace-nowrap "
                >
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td className="px-0 py-4">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img-section w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to={"/products/1342421"}>
                        <img
                          className="w-full group-hover:scale-110 transition-all h-full object-cover"
                          src="https://t3.ftcdn.net/jpg/03/34/79/68/360_F_334796865_VVTjg49nbLgQPG6rgKDjVqSb5XUhBVsW.jpg"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h3 className="font-[500] hover:text-primary text-gray-800 leading-4 text-[12px]">
                        <Link to={"/products/1342421"}>
                          Lorem ipsum dolor sit amet consectetur.
                        </Link>
                      </h3>
                      <span className="text-[12px]">Zara</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">Fashion</td>
                <td className="px-6 py-4">Women</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col items-center">
                    <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                      $67.97
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $54.00
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> Sale
                  </p>
                  <ProgressBar value={10} type="success" />
                </td>
                <td className="px-6 py-4">
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
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td
                  scope="row"
                  className="px-6 pr-0 py-2 font-medium text-gray-900 whitespace-nowrap "
                >
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td className="px-0 py-4">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img-section w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to={"/products/1342421"}>
                        <img
                          className="w-full group-hover:scale-110 transition-all h-full object-cover"
                          src="https://t3.ftcdn.net/jpg/03/34/79/68/360_F_334796865_VVTjg49nbLgQPG6rgKDjVqSb5XUhBVsW.jpg"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h3 className="font-[500] hover:text-primary text-gray-800 leading-4 text-[12px]">
                        <Link to={"/products/1342421"}>
                          Lorem ipsum dolor sit amet consectetur.
                        </Link>
                      </h3>
                      <span className="text-[12px]">Zara</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">Fashion</td>
                <td className="px-6 py-4">Women</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col items-center">
                    <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                      $67.97
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $54.00
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> Sale
                  </p>
                  <ProgressBar value={10} type="warning" />
                </td>
                <td className="px-6 py-4">
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
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td
                  scope="row"
                  className="px-6 pr-0 py-2 font-medium text-gray-900 whitespace-nowrap "
                >
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td className="px-0 py-4">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img-section w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to={"/products/1342421"}>
                        <img
                          className="w-full group-hover:scale-110 transition-all h-full object-cover"
                          src="https://t3.ftcdn.net/jpg/03/34/79/68/360_F_334796865_VVTjg49nbLgQPG6rgKDjVqSb5XUhBVsW.jpg"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h3 className="font-[500] hover:text-primary text-gray-800 leading-4 text-[12px]">
                        <Link to={"/products/1342421"}>
                          Lorem ipsum dolor sit amet consectetur.
                        </Link>
                      </h3>
                      <span className="text-[12px]">Zara</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">Fashion</td>
                <td className="px-6 py-4">Women</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col items-center">
                    <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                      $67.97
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $54.00
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> Sale
                  </p>
                  <ProgressBar value={10} type="success" />
                </td>
                <td className="px-6 py-4">
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
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td
                  scope="row"
                  className="px-6 pr-0 py-2 font-medium text-gray-900 whitespace-nowrap "
                >
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td className="px-0 py-4">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img-section w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to={"/products/1342421"}>
                        <img
                          className="w-full group-hover:scale-110 transition-all h-full object-cover"
                          src="https://t3.ftcdn.net/jpg/03/34/79/68/360_F_334796865_VVTjg49nbLgQPG6rgKDjVqSb5XUhBVsW.jpg"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h3 className="font-[500] hover:text-primary text-gray-800 leading-4 text-[12px]">
                        <Link to={"/products/1342421"}>
                          Lorem ipsum dolor sit amet consectetur.
                        </Link>
                      </h3>
                      <span className="text-[12px]">Zara</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">Fashion</td>
                <td className="px-6 py-4">Women</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col items-center">
                    <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                      $67.97
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $54.00
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> Sale
                  </p>
                  <ProgressBar value={10} type="success" />
                </td>
                <td className="px-6 py-4">
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
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td
                  scope="row"
                  className="px-6 pr-0 py-2 font-medium text-gray-900 whitespace-nowrap "
                >
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td className="px-0 py-4">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img-section w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to={"/products/1342421"}>
                        <img
                          className="w-full group-hover:scale-110 transition-all h-full object-cover"
                          src="https://t3.ftcdn.net/jpg/03/34/79/68/360_F_334796865_VVTjg49nbLgQPG6rgKDjVqSb5XUhBVsW.jpg"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h3 className="font-[500] hover:text-primary text-gray-800 leading-4 text-[12px]">
                        <Link to={"/products/1342421"}>
                          Lorem ipsum dolor sit amet consectetur.
                        </Link>
                      </h3>
                      <span className="text-[12px]">Zara</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">Fashion</td>
                <td className="px-6 py-4">Women</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col items-center">
                    <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                      $67.97
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $54.00
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> Sale
                  </p>
                  <ProgressBar value={10} type="error" />
                </td>
                <td className="px-6 py-4">
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
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td
                  scope="row"
                  className="px-6 pr-0 py-2 font-medium text-gray-900 whitespace-nowrap "
                >
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td className="px-0 py-4">
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img-section w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to={"/products/1342421"}>
                        <img
                          className="w-full group-hover:scale-110 transition-all h-full object-cover"
                          src="https://t3.ftcdn.net/jpg/03/34/79/68/360_F_334796865_VVTjg49nbLgQPG6rgKDjVqSb5XUhBVsW.jpg"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h3 className="font-[500] hover:text-primary text-gray-800 leading-4 text-[12px]">
                        <Link to={"/products/1342421"}>
                          Lorem ipsum dolor sit amet consectetur.
                        </Link>
                      </h3>
                      <span className="text-[12px]">Zara</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">Fashion</td>
                <td className="px-6 py-4">Women</td>
                <td className="px-6 py-4">
                  <div className="flex flex-col items-center">
                    <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                      $67.97
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $54.00
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> Sale
                  </p>
                  <ProgressBar value={10} type="error" />
                </td>
                <td className="px-6 py-4">
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-end py-5 px-4">
          <Pagination count={10} variant="outlined" shape="rounded" />
        </div>
      </div>

      <div className="card bg-white overflow-hidden shadow-md sm:rounded-lg rounded-md border my-4 border-gray-200 hover:border-gray-400 transition-all">
        <div className="flex items-center px-5 py-2 justify-between">
          <h3 className="text-[20px] font-[600]">Products</h3>
        </div>
          <div className="flex items-center w-full px-5 py-2 justify-between">
            <div className="col w-[20%]">
              <h4 className="font-[600] text-[13px] mb-2">Category By</h4>
              <Select
              className="w-full"
              size="small"
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={categoryFilterVal}
          onChange={handleChangeCatFilter}
          label="Category"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Men</MenuItem>
          <MenuItem value={20}>Women</MenuItem>
          <MenuItem value={30}>Kids</MenuItem>
        </Select>
            </div>
            <div className="col flex items-center justify-between gap-3 ml-auto">
              <Button className="!bg-green-600 !font-medium !py-[6px] !text-[13px]  !px-[14px] !text-white !flex !items-center gap-2 !capitalize"><BiExport className="mb-1" size={'16px'} /> Export</Button>
              <Button onClick={() => context.setIsOpenFullScreenPannel({open: true, model: 'Add Product'})} className="!bg-blue-600 !font-medium !py-[6px]  !text-[13px] !px-[14px] !text-white gap-2 !capitalize"><FaPlus /> Add Product</Button>
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
                          src="https://t3.ftcdn.net/jpg/03/34/79/68/360_F_334796865_VVTjg49nbLgQPG6rgKDjVqSb5XUhBVsW.jpg"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h3 className="font-[500] hover:text-primary text-gray-800 leading-4 text-[12px]">
                        <Link to="/products/1342421" data-discover="true">
                          Lorem ipsum dolor sit amet consectetur.
                        </Link>
                      </h3>
                      <span className="text-[12px]">Zara</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Fashion
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Woman
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex flex-col items-center">
                    <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                      $67.97
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $54.00
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> Sale
                  </p>
                  <ProgressBar value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
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
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img-section w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/products/1342421" data-discover="true">
                        <img
                          className="w-full group-hover:scale-110 transition-all h-full object-cover"
                          src="https://t3.ftcdn.net/jpg/03/34/79/68/360_F_334796865_VVTjg49nbLgQPG6rgKDjVqSb5XUhBVsW.jpg"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h3 className="font-[500] hover:text-primary text-gray-800 leading-4 text-[12px]">
                        <Link to="/products/1342421" data-discover="true">
                          Lorem ipsum dolor sit amet consectetur.
                        </Link>
                      </h3>
                      <span className="text-[12px]">Zara</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Fashion
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Woman
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex flex-col items-center">
                    <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                      $67.97
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $54.00
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> Sale
                  </p>
                  <ProgressBar value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
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
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img-section w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/products/1342421" data-discover="true">
                        <img
                          className="w-full group-hover:scale-110 transition-all h-full object-cover"
                          src="https://t3.ftcdn.net/jpg/03/34/79/68/360_F_334796865_VVTjg49nbLgQPG6rgKDjVqSb5XUhBVsW.jpg"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h3 className="font-[500] hover:text-primary text-gray-800 leading-4 text-[12px]">
                        <Link to="/products/1342421" data-discover="true">
                          Lorem ipsum dolor sit amet consectetur.
                        </Link>
                      </h3>
                      <span className="text-[12px]">Zara</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Fashion
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Woman
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex flex-col items-center">
                    <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                      $67.97
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $54.00
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> Sale
                  </p>
                  <ProgressBar value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
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
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img-section w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/products/1342421" data-discover="true">
                        <img
                          className="w-full group-hover:scale-110 transition-all h-full object-cover"
                          src="https://t3.ftcdn.net/jpg/03/34/79/68/360_F_334796865_VVTjg49nbLgQPG6rgKDjVqSb5XUhBVsW.jpg"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h3 className="font-[500] hover:text-primary text-gray-800 leading-4 text-[12px]">
                        <Link to="/products/1342421" data-discover="true">
                          Lorem ipsum dolor sit amet consectetur.
                        </Link>
                      </h3>
                      <span className="text-[12px]">Zara</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Fashion
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Woman
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex flex-col items-center">
                    <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                      $67.97
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $54.00
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> Sale
                  </p>
                  <ProgressBar value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
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
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4 w-[300px]">
                    <div className="img-section w-[65px] h-[65px] rounded-md overflow-hidden group">
                      <Link to="/products/1342421" data-discover="true">
                        <img
                          className="w-full group-hover:scale-110 transition-all h-full object-cover"
                          src="https://t3.ftcdn.net/jpg/03/34/79/68/360_F_334796865_VVTjg49nbLgQPG6rgKDjVqSb5XUhBVsW.jpg"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="info w-[75%]">
                      <h3 className="font-[500] hover:text-primary text-gray-800 leading-4 text-[12px]">
                        <Link to="/products/1342421" data-discover="true">
                          Lorem ipsum dolor sit amet consectetur.
                        </Link>
                      </h3>
                      <span className="text-[12px]">Zara</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Fashion
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  Woman
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex flex-col items-center">
                    <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
                      $67.97
                    </span>
                    <span className="price text-primary text-[14px] font-[600]">
                      $54.00
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> Sale
                  </p>
                  <ProgressBar value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
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

      <div className="card bg-white overflow-hidden shadow-md sm:rounded-lg rounded-md border my-4 border-gray-200 hover:border-gray-400 transition-all">
        <div className="flex items-center px-3 py-5 justify-between">
          <h3 className="text-[20px] font-[600]">Recent Orders</h3>
        </div>
        <div className="relative w-full overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100  ">
              <tr>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  <Button className="!w-[35px] !min-w-[35px] !bg-[#f1f1f1] !text-gray-600  !rounded-full !h-[35px]">
                    <FaAngleDown size={"18px"} />
                  </Button>
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  Order Id
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  Payment Id
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  Products
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  Name
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  Address
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  Pincode
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  Total Amount
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  User Id
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  Email
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  User Id
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  Order Status
                </th>
                <th scope="col" className="px-6 whitespace-nowrap py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  &nbsp;
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">$2999</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card bg-white overflow-hidden shadow-md sm:rounded-lg rounded-md border my-4 border-gray-200 hover:border-gray-400 transition-all">
                <div className="flex items-center px-3 py-5 justify-between">
      <h3 className="text-[20px] font-[600]">Total Users & Total Sales</h3>
        </div>
      <div className="flex items-center gap-5 px-5 pb-5 pt-0">
        <span className="flex items-center gap-1 text-[15px] font-medium"> <span className="block w-[10px] h-[10px] rounded-full bg-green-600"></span> Total Users</span>
        <span className="flex items-center gap-1 text-[15px] font-medium"> <span className="block w-[10px] h-[10px] rounded-full bg-primary"></span> Total Sales</span>
      </div>
        <LineChart
          width={1000}
          height={500}
          data={chart1Data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid stroke="none" strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{fontSize: 12}} />
          <YAxis tick={{fontSize: 12}} />
          <Tooltip />
          <Legend />
          <Line type="monotone" strokeWidth={3} dataKey="TotalSales" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" strokeWidth={3} filter="url(#shadow)" dataKey="TotalUsers" stroke="#82ca9d" />
        </LineChart>
      </div>
    </>
  );
}

export default Dashboard;
