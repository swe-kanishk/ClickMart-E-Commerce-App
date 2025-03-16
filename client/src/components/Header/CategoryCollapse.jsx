import React, { useContext, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import { MyContext } from "../../App";

function CategoryCollapse() {
  const context = useContext(MyContext)
  const [submenu, setSubmenu] = useState(null);
  const [innerSubmenu, setInnerSubmenu] = useState(null);

  const openSubmenu = (index) => {
    if (submenu === index) {
      setSubmenu(null);
    } else {
      setSubmenu(index);
    }
  };

  const openInnerSubmenu = (index) => {
    if (innerSubmenu === index) {
      setInnerSubmenu(null);
    } else {
      setInnerSubmenu(index);
    }
  };
  return (
    <ul className="w-full bg-white">
      {context?.categoryData?.length > 0 &&
        context?.categoryData?.map((catData) => {
          return (
            <li key={catData?._id} className="list-none relative">
              <Link to={"/"} className="w-full">
                <Button className="w-full !px-3 !justify-start !text-[#242424] gap-3">
                  <img src={catData?.images} className="h-[20px]" alt="" />{" "}
                  {catData?.name}
                </Button>
              </Link>
              <FaAngleDown
                onClick={() => openSubmenu(catData?._id)}
                className={`absolute top-[10px] ${
                  submenu === catData?._id && "rotate-180"
                } transition-transform delay-[50ms] right-5 cursor-pointer`}
              />
              {submenu === catData?._id && catData?.children?.length > 0 && (
                <ul className="submenu w-full pl-3">
                  {catData?.children?.map((subCat) => {
                    return (
                      <li key={subCat?._id} className="list-none relative">
                        <Link to={"/"} className="w-full">
                          <Button className="w-full !px-3 !justify-start !text-[#242424] gap-3">
                            {subCat?.name}
                          </Button>
                        </Link>
                        <FaAngleDown
                          onClick={() => openInnerSubmenu(subCat?._id)}
                          className={`absolute top-[10px] ${
                            innerSubmenu === subCat?._id && "rotate-180"
                          } transition-transform delay-[50ms] right-5 cursor-pointer`}
                        />
                        {innerSubmenu === subCat?._id &&
                          subCat?.children?.length > 0 && (
                            <ul className="innerSubmenu w-full pl-3 flex mt-2 flex-col gap-4">
                              {subCat?.children?.map((thirdLevelSubCat) => {
                                return (
                                  <li
                                    key={thirdLevelSubCat?._id}
                                    className="list-none relative"
                                  >
                                    <Link
                                      to={"/#"}
                                      className="link w-full flex transition text-[14px] !px-3 !justify-start gap-3"
                                    >
                                      {thirdLevelSubCat?.name}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
    </ul>
  );
}

export default CategoryCollapse;
