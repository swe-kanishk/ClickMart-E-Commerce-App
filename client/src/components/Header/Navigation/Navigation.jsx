import { Button } from "@mui/material";
import React, { useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import CategoryPannel from "./CategoryPannel";

import "./style.css";

function Navigation() {
  
  const [isOpenCategory, setIsOpenCategory] = useState(false);

  return (
    <>
      <nav className="py-2">
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
              <li className="list-none">
                <Link to="/home" className="transition font-[500]">
                  <Button className="transition !text-[15px]">Home</Button>
                </Link>
              </li>
              <li className="list-none relative group">
                <Link to="/home" className="transition text-[15px] font-[500]">
                  <Button className="transition">Fashion</Button>
                </Link>
                <div className="navigation-submenu z-50 group-hover:flex flex-col link transition-all group-hover:opacity-100 opacity-0 delay-100 absolute top-[110%] hidden left-0 min-w-[200px] bg-white shadow-md">
                  <ul className="w-full">
                    <li className="list-none">
                      <Link to={"/#"} className="w-full group">
                        <Button className="hover:!text-[rgba(0,0,0,0.8)] !w-full !justify-start !rounded-none !px-3">
                          Men
                        </Button>
                        <div className="navigation-innerSubmenu flex-col link transition-all opacity-0 delay-100 absolute top-[0%] hidden left-[120%] min-w-[200px] bg-white shadow-md">
                          <ul className="w-full">
                            <li className="list-none">
                              <Link to={"/#"} className="w-full">
                                <Button className="hover:!text-[rgba(0,0,0,0.8)] !w-full !justify-start !rounded-none !px-3">
                                  T-Shirt
                                </Button>
                              </Link>
                            </li>
                            <li className="list-none">
                              <Link to={"/#"} className="w-full">
                                <Button className="hover:!text-[rgba(0,0,0,0.8)] !w-full !justify-start !rounded-none !px-3">
                                  Jeans
                                </Button>
                              </Link>
                            </li>
                            <li className="list-none">
                              <Link to={"/#"} className="w-full">
                                <Button className="hover:!text-[rgba(0,0,0,0.8)] !w-full !justify-start !rounded-none !px-3">
                                  Footwear
                                </Button>
                              </Link>
                            </li>
                            <li className="list-none">
                              <Link to={"/#"} className="w-full">
                                <Button className="hover:!text-[rgba(0,0,0,0.8)] !w-full !justify-start !rounded-none !px-3">
                                  Watch
                                </Button>
                              </Link>
                            </li>
                            <li className="list-none">
                              <Link to={"/#"} className="w-full">
                                <Button className="hover:!text-[rgba(0,0,0,0.8)] !w-full !justify-start !rounded-none !px-3">
                                  Pents
                                </Button>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </Link>
                    </li>
                    <li className="list-none">
                      <Link to={"/#"} className="w-full">
                        <Button className="hover:!text-[rgba(0,0,0,0.8)] !w-full !justify-start !rounded-none !px-3">
                          Women
                        </Button>
                      </Link>
                    </li>
                    <li className="list-none">
                      <Link to={"/#"} className="w-full">
                        <Button className="hover:!text-[rgba(0,0,0,0.8)] !w-full !justify-start !rounded-none !px-3">
                          Kids
                        </Button>
                      </Link>
                    </li>
                    <li className="list-none">
                      <Link to={"/#"} className="w-full">
                        <Button className="hover:!text-[rgba(0,0,0,0.8)] !w-full !justify-start !rounded-none !px-3">
                          Girls
                        </Button>
                      </Link>
                    </li>
                    <li className="list-none">
                      <Link to={"/#"} className="w-full">
                        <Button className="hover:!text-[rgba(0,0,0,0.8)] !w-full !justify-start !rounded-none !px-3">
                          Boys
                        </Button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="list-none">
                <Link to="/home" className="transition font-[500]">
                  <Button className="transition !text-[15px]">
                    Electronics
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/home" className="transition font-[500]">
                  <Button className="transition !text-[15px]">Footwear</Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/home" className="transition font-[500]">
                  <Button className="transition !text-[15px]">Groceries</Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/home" className="transition font-[500]">
                  <Button className="transition !text-[15px]">Bags</Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/home" className="transition font-[500]">
                  <Button className="transition !text-[15px]">Jewellery</Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/home" className="transition font-[500]">
                  <Button className="transition !text-[15px]">Beauty</Button>
                </Link>
              </li>
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

      {/* category pannel component */}
      <CategoryPannel
        setIsOpenCategory={setIsOpenCategory}
        isOpenCategory={isOpenCategory}
      />
    </>
  );
}

export default Navigation;
