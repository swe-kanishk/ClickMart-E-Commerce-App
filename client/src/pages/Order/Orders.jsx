import React from "react";
import AccountSidebar from "../My-Account/AccountSidebar";
import { Button } from "@mui/material";
import { FaAngleDown } from "react-icons/fa6";

function Orders() {
  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        <div className="left-col w-[20%]">
          <AccountSidebar />
        </div>
        <div className="right-col w-[80%]">
          <div className="shadow-md rounded-md mb-10 bg-white">
            <div className="px-3 py-2 border-b mb-1">
              <h2>My Orders</h2>
              <p>
                You have ordered{" "}
                <span className="text-red-500 font-medium">2</span> products
              </p>
              <div className="relative overflow-x-auto mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100  ">
                    <tr>
                      <th scope="col" className="px-6 whitespace-nowrap py-3">
                        <Button className="!w-[35px] !min-w-[35px] !bg-[#f1f1f1] !text-gray-600  !rounded-full !h-[35px]"><FaAngleDown size={'18px'} /></Button>
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default Orders;
