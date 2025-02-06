import { Button } from '@mui/material'
import React from 'react'
import { FaAngleDown } from 'react-icons/fa'
import ProductSearchbox from '../Components/ProductSearchbox'

function Orders() {
  return (
    <div className="card bg-white overflow-hidden shadow-md sm:rounded-lg rounded-md border my-4 border-gray-200 hover:border-gray-400 transition-all">
    <div className="flex items-center px-3 py-5 justify-between">
      <h3 className="text-[20px] font-[600]">Recent Orders</h3>
      <div className="col w-[30%] ml-auto">
        <ProductSearchbox />
      </div>
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
  )
}

export default Orders
