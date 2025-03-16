import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import CategoryPannel from "./CategoryPannel";

import "./style.css";
import { MyContext } from "../../../App";

function Navigation() {
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const context = useContext(MyContext)
  return (
    <>
      <nav>
        <div className="container flex items-center justify-end gap-6">
          <div className="col-1 w-[20%] text-start">
            <Button
              onClick={() => setIsOpenCategory(true)}
              className="!text-black w-full !font-[500] gap-2"
            >
              <RiMenu2Line size={"18px"} /> Shop By Categories{" "}
              <FaAngleDown size={"16px"} className="ml-auto" />
            </Button>
          </div>
          <div className="col-2 w-[60%] flex-1 border-l border-r">
            <ul className="flex justify-evenly items-center gap-2">
              {context?.categoryData?.length > 0 &&
                context?.categoryData?.map((cat) => {
                  return (
                    <li key={cat?._id} className="list-none relative group">
                      <Link
                        to="/home"
                        className="transition text-[15px] flex items-center font-[600]"
                      >
                        <img src={cat?.images} className="h-[16px]" alt="" />
                        <Button className="transition !py-3">
                          {cat?.name}
                        </Button>
                      </Link>
                      {cat?.children?.length > 0 && (
                        <div className="submenu z-50 absolute top-[100%] left-[0%] min-w-[200px] bg-white shadow-md opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible">
                          <ul className="w-full">
                            {cat?.children?.map((subCat) => {
                              return (
                                <li
                                  key={subCat?._id}
                                  className="list-none group/sub"
                                >
                                  <Link to={"/#"} className="w-full">
                                    <Button className="hover:!text-[rgba(0,0,0,0.8)] !w-full !justify-start !rounded-none !px-3">
                                      {subCat?.name}
                                    </Button>
                                  </Link>
                                  {subCat?.children?.length > 0 && (
                                    <div className="inner-submenu z-50 absolute top-[0%] left-[100%] min-w-[200px] bg-white shadow-md opacity-0 invisible transition-all group-hover/sub:opacity-100 group-hover/sub:visible">
                                      <ul className="w-full">
                                        {subCat?.children?.map(
                                          (thirdLevelSubCat) => {
                                            return (
                                              <li
                                                key={thirdLevelSubCat?._id}
                                                className="list-none"
                                              >
                                                <Link
                                                  to={"/#"}
                                                  className="w-full"
                                                >
                                                  <Button className="hover:!text-[rgba(0,0,0,0.8)] !w-full !justify-start !rounded-none !px-3">
                                                    {thirdLevelSubCat?.name}
                                                  </Button>
                                                </Link>
                                              </li>
                                            );
                                          }
                                        )}
                                      </ul>
                                    </div>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="col-3 w-fit max-w-[300px]">
            <Button className="!text-black w-full !font-[500] !text-[14px] gap-2">
              <GoRocket size={"18px"} />
              Free International Delivery
            </Button>
          </div>
        </div>
      </nav>
      {context?.categoryData?.length > 0 && (
        <CategoryPannel
          setIsOpenCategory={setIsOpenCategory}
          isOpenCategory={isOpenCategory}
        />
      )}
    </>
  );
}

export default Navigation;
