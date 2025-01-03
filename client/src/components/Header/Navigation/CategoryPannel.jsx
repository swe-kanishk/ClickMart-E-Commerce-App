import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { MdClose } from "react-icons/md";

import "./style.css";
import CategoryCollapse from "../CategoryCollapse";

function CategoryPannel({ setIsOpenCategory, isOpenCategory }) {
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">
      <h3 className="p-3 text-[18px] font-medium flex items-center justify-between">
        Shop By Categories{" "}
        <MdClose
          className="cursor-pointer"
          onClick={() => setIsOpenCategory(false)}
        />
      </h3>
      <CategoryCollapse />
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
