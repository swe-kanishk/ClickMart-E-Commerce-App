import { Button } from '@mui/material';
import React, { useState } from 'react'
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

function QtyBox() {

    const [qty, setQty] = useState(1);

    const handleQuantity = (type) => () => {
        if (type === "add") setQty(qty + 1);
        else {
            if (qty > 1) setQty(qty - 1);
        }
    }
    
  return (
    <div className='qtyBox flex h-[32px] items-center border border-black'>
      <input type="number" min={1} value={qty} className='w-full  text-[15px] border h-full border-black text-center focus:outline-none px-2' />
      <div className='flex flex-col qty-btns justify-between h-full'>
      <Button onClick={handleQuantity("add")} className='btn !min-w-[20px] !min-h-[10px] !text-black !items-start !rounded-none !p-0'><FaAngleUp size={'14px'} /></Button>
      <Button onClick={handleQuantity("subtract")} className='btn !min-w-[20px] !min-h-[10px] !text-black !items-end !rounded-none !p-0'><FaAngleDown size={'14px'} /></Button>
      </div>
    </div>
  )
}

export default QtyBox
