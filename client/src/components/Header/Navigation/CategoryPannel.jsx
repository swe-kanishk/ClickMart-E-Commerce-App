import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { MdClose } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { GiClothes } from "react-icons/gi";
import { GiHanger } from "react-icons/gi";
import { FaTabletAlt } from "react-icons/fa";
import { FiWatch } from "react-icons/fi";
import { IoDiamond } from "react-icons/io5";
import { FaTshirt } from "react-icons/fa";

import "./style.css";
import { Link } from "react-router-dom";

function CategoryPannel({ setIsOpenCategory, isOpenCategory }) {
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const [innerSubmenuIndex, setInnerSubmenuIndex] = useState(null);

  const openSubmenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  };

  const openInnerSubmenu = (index) => {
    if (innerSubmenuIndex === index) {
      setInnerSubmenuIndex(null);
    } else {
      setInnerSubmenuIndex(index);
    }
  };
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">
      <h3 className="p-3 text-[18px] font-medium flex items-center justify-between">
        Shop By Categories{" "}
        <MdClose
          className="cursor-pointer"
          onClick={() => setIsOpenCategory(false)}
        />
      </h3>
      <div className="scroll">
        <ul className="w-full">
          <li className="list-none relative">
            <Link to={"/"} className="w-full">
              <Button className="w-full !px-3 !justify-start !text-[#242424] gap-3">
                <GiClothes size={"18px"} /> Fashion
              </Button>
            </Link>
            <FaAngleDown
              onClick={() => openSubmenu(0)}
              className={`absolute top-[10px] ${submenuIndex !== null && 'rotate-180'} transition-transform delay-[50ms] right-5 cursor-pointer`}
            />
            {submenuIndex === 0 && (
              <ul className="submenu absolute top-[100%] w-full left-0 pl-3">
                <li className="list-none relative">
                  <Link to={"/"} className="w-full">
                    <Button className="w-full !px-3 !justify-start !text-[#242424] gap-3">
                      <GiHanger size={"18px"} /> Apparel
                    </Button>
                  </Link>
                  <FaAngleDown
                    onClick={() => openInnerSubmenu(0)}
                    className={`absolute top-[10px] ${innerSubmenuIndex !== null && 'rotate-180'} transition-transform delay-[50ms] right-5 cursor-pointer`}
                  />
                  {innerSubmenuIndex === 0 && (
                    <ul className="innerSubmenu absolute top-[100%] w-full left-0 pl-3 flex mt-2 flex-col gap-4">
                      <li className="list-none relative">
                        <Link
                          to={"/#"}
                          className="link w-full flex transition text-[14px] !px-3 !justify-start gap-3"
                        >
                          <FaTabletAlt size={"18px"} /> Smart Tablet
                        </Link>
                      </li>
                      <li className="list-none relative">
                        <Link
                          to={"/#"}
                          className="link w-full flex transition text-[14px] !px-3 !justify-start gap-3"
                        >
                          <FiWatch size={"18px"} /> Leather watch
                        </Link>
                      </li>
                      <li className="list-none relative">
                        <Link
                          to={"/#"}
                          className="link w-full flex transition text-[14px] !px-3 !justify-start gap-3"
                        >
                          <IoDiamond size={"18px"} /> Rolling Diamond
                        </Link>
                      </li>
                      <li className="list-none relative">
                        <Link
                          to={"/#"}
                          className="link w-full flex transition text-[14px] !px-3 !justify-start gap-3"
                        >
                          <FaTshirt size={"18px"} /> Crepe T-Shirt
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </Box>
  );

  return (
    <>
      <Drawer open={isOpenCategory} onClose={() => setIsOpenCategory(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}

export default CategoryPannel;