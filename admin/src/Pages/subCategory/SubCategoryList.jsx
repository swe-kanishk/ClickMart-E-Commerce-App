import React, { useContext, useState } from "react";
import { MyContext } from "../../App";
import { Button } from "@mui/material";
import { BiExport } from "react-icons/bi";
import { FaAngleDown, FaPlus } from "react-icons/fa6";
import EditSubCategoryBox from "./EditSubCategoryBox";

function SubCategoryList() {
  const context = useContext(MyContext);

  const [isOpen, setIsOpen] = useState(null);

  const expand = (id) => {
    if (isOpen === id) setIsOpen(null);
    else setIsOpen(id);
  };

  return (
    <>
      <div className="flex items-center px-2 py-0 mt-3 justify-between">
        <h2 className="text-[20px] font-[600]">Sub Category List</h2>
        <div className="col flex items-center justify-end gap-3 ml-auto">
          <Button className="!bg-green-600 !font-medium !py-[6px] !text-[13px]  !px-[14px] !text-white !flex !items-center gap-2 !capitalize">
            <BiExport className="mb-1" size={"16px"} /> Export
          </Button>
          <Button
            onClick={() =>
              context.setIsOpenFullScreenPannel({
                open: true,
                model: "Add New Sub Category",
              })
            }
            className="!bg-blue-600 !font-medium !py-[6px]  !text-[13px] !px-[14px] !text-white gap-2 !capitalize"
          >
            <FaPlus /> Add New Sub Category
          </Button>
        </div>
      </div>
      <div className="card bg-white p-5 overflow-hidden shadow-md sm:rounded-lg rounded-md border my-4 border-gray-200 hover:border-gray-400 transition-all">
        {context?.categoryData?.length > 0 && (
          <ul className="w-full">
            {context?.categoryData?.map((cat) => {
              return (
                <li key={cat?._id} className="w-full mb-1">
                  <div className="flex items-center w-full p-2 bg-[#f1f1f1] rounded-md px-4">
                    <span className="flex items-center gap-4 text-[14px]">
                      {cat?.name}
                    </span>
                    <Button
                      onClick={() => expand(cat?._id)}
                      className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-gray-600 !ml-auto"
                    >
                      <FaAngleDown
                        className={`${
                          isOpen === cat?._id ? "rotate-60" : "-rotate-90"
                        } transition-all`}
                        size={"22px"}
                      />
                    </Button>
                  </div>
                  {isOpen === cat?._id && (
                    <ul className="w-full transition-all">
                      {cat?.children?.length > 0 &&
                        cat?.children?.map((subCat) => {
                          return (
                            <li key={subCat?._id} className="w-full py-1">
                              <EditSubCategoryBox name={subCat?.name} id={subCat?._id} selectedCat={subCat?.parentId} categoryData={context?.categoryData} selectedCatName={subCat?.parentCatName} />
                              {
                                subCat?.children?.length > 0 && (
                                  <ul className="w-full pl-4">
                                    {subCat?.children?.map((thirdCat) => {
                                      return (
                                        <li key={thirdCat?._id} className="w-full py-1">
                                          <EditSubCategoryBox name={thirdCat?.name} id={thirdCat?._id} categoryData={cat?.children} selectedCat={thirdCat?.parentId} selectedCatName={thirdCat?.parentCatName} />
                                        </li>
                                      );
                                    })}
                                  </ul>
                                )
                              }
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
      </div>
    </>
  );
}

export default SubCategoryList;
