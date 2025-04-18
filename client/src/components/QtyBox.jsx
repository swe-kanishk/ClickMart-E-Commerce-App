import { Button } from "@mui/material";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

function QtyBox({ qty, setQty }) {

  const handleQuantity = (type) => () => {
    if (type === "add") setQty(qty + 1);
    else {
      if (qty > 1) setQty(qty - 1);
    }
  };

  return (
    <div className="qtyBox flex h-[36px] relative group items-center rounded-md hover:border-gray-500 overflow-hidden border border-slate-400">
      <input
        type="number"
        min={1}
        value={qty}
        className="w-full border-r text-gray-500 focus:text-gray-600  border-slate-400 group-hover:border-gray-500 text-[15px]  h-full  text-center focus:outline-none px-2"
      />
      <div className="flex flex-col justify-between h-full">
        <Button
          onClick={handleQuantity("add")}
          className="btn !min-w-[20px] !min-h-[10px] hover:!text-gray-600 hover:!bg-gray-200 !text-slate-400 !items-start !rounded-none !p-1"
        >
          <FaAngleUp size={"12px"} />
        </Button>
        <Button
          onClick={handleQuantity("subtract")}
          className="btn !min-w-[20px] !min-h-[10px] hover:!text-gray-600 hover:!bg-gray-200 !text-slate-400 !items-end !rounded-none !p-1"
        >
          <FaAngleDown size={"12px"} />
        </Button>
      </div>
    </div>
  );
}

export default QtyBox;
