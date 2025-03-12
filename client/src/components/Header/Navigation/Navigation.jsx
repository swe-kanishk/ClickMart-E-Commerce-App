import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import CategoryPannel from "./CategoryPannel";

import "./style.css";
import { getData } from "../../../utils/api";

function Navigation() {
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  const getCat = () => {
    getData("/api/category").then((res) => {
      if (res?.success === true) {
        setCategoryData(res?.data);
      }
    });
  };

  useEffect(() => {
    getCat();
  }, []);

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
              {categoryData?.length > 0 &&
                categoryData?.map((cat) => {
                  return (
                    <li key={cat?._id} className="list-none relative group">
                      <Link
                        to="/home"
                        className="transition text-[15px] font-[500]"
                      >
                        <Button className="transition !py-3">
                          {cat?.name}
                        </Button>
                      </Link>
                      {cat?.children?.length > 0 && (
                        <div className="navigation-submenu z-50 group-hover:flex flex-col link transition-all group-hover:opacity-100 opacity-0 delay-100 absolute top-[105%] hidden left-0 min-w-[200px] bg-white shadow-md">
                          <ul className="w-full">
                            {cat?.children?.map((subCat) => {
                              return (
                                <li key={subCat?._id} className="list-none">
                                  <Link to={"/#"} className="w-full group">
                                    <Button className="hover:!text-[rgba(0,0,0,0.8)] !w-full !justify-start !rounded-none !px-3">
                                      {subCat?.name}
                                    </Button>
                                    {subCat?.children?.length > 0 && (
                                      <div className="navigation-innerSubmenu flex-col link transition-all opacity-0 delay-100 absolute top-[0%] hidden left-[120%] min-w-[200px] bg-white shadow-md">
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
                                  </Link>
                                </li>
                              );
                            })}{" "}
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
      {categoryData?.length > 0 && (
        <CategoryPannel
          setIsOpenCategory={setIsOpenCategory}
          isOpenCategory={isOpenCategory}
          categoryData={categoryData}
        />
      )}
    </>
  );
}

export default Navigation;
