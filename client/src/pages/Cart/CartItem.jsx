import { Button, Rating } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { GoTriangleDown } from "react-icons/go";
import { MyContext } from "../../App";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { editData } from "../../utils/api";
import toast from "react-hot-toast"; 

function CartItem({ item }) {
  const context = useContext(MyContext);
  const [ratingValue, setRatingValue] = useState(2);
  const [openQty, setOpenQty] = useState(false)
  const [openProductOption, setOpenProuctOption] = useState(false)

  const [selectedQty, setSelectedQty] = useState(item?.quantity)
  const [selectedOption, setSelectedOption] = useState(item?.productSize || item?.productRAM || item?.productWeight || null
  )

  const handleOptionClick = (val) => {
    setSelectedOption(val);
    setOpenProuctOption(false)
    updateCartItem('option', val);
  };
  const handleQtyClick = (val) => {
    setSelectedQty(parseInt(val));
    setOpenQty(false)
    updateCartItem('qty', val);
  };

  const updateCartItem = (type, val) => {
    const updatedProductData = {
      productId: item?.productId,
      quantity: type === 'qty' ? val : selectedQty,
      subTotal: parseInt(item?.price) * selectedQty,
      productSize: type === 'option' ? (item?.productSize ? val : '') : item?.productSize ? selectedOption : '', 
      productRAM: type === 'option' ? (item?.productRAM ? val : '') : item?.productRAM ? selectedOption : '',
      productWeight: type === 'option' ? (item?.productWeight ? val : '') : item?.productWeight ? selectedOption : '',
    };
    editData('/api/cart', updatedProductData, {withCredentials: true}).then((res) => {
      if(res?.data?.success === true) {
        toast.success(res?.data?.message)
        const updatedData = res?.data?.updatedCartItem
        const updatedCartData = context?.cartData?.map(item => item?._id === updatedData?._id ? updatedData : item);
        context?.setCartData(updatedCartData)
      }
    })
  }
  return (
    <>
      <div className="cartItem w-full border-b pb-5 border-gray-300 p-3 flex items-start gap-4">
        <div className="img-section w-[15%] rounded-lg overflow-hidden">
          <Link>
            <img src={item?.image} alt="" className="w-full" />
          </Link>
        </div>
        <div className="info w-[85%] relative">
          <Button
            onClick={() => context?.removeItemFromCart(item?._id)}
            className="!rounded-full !absolute !-top-1 !-right-1 !min-h-[35px] !h-[35px] !flex !items-center !justify-center !min-w-[35px] !w-[35px] !text-gray-500"
          >
            <IoMdClose size={"22px"} />
          </Button>
          <span className="text-[13px]">{item?.brand}</span>
          <h3 className="text-[15px]">
            <Link to="/" className="link">
              {item?.productTitle}
            </Link>
          </h3>
          <Rating name="read-only" value={item?.rating} size="small" readOnly />
          <div className="flex items-center gap-4">
            {(item?.productSize || item?.productRAM || item?.productWeight) && (
              <div className="relative">
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={() => setOpenProuctOption(true)}
                  className=" !bg-[#f1f1f1] !capitalize !text-black !py-1 !px-3 !cursor-pointer !rounded-md !font-medium !mt-2 !text-[12px]"
                >
                  {item?.productSize && (
                    <>
                      Size: {selectedOption} <GoTriangleDown />
                    </>
                  )}
                  {item?.productRAM && (
                    <>
                      RAM: {selectedOption} <GoTriangleDown />
                    </>
                  )}
                  {item?.productWeight && (
                    <>
                      Weight: {selectedOption} <GoTriangleDown />
                    </>
                  )}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={selectedOption}
                  open={openProductOption}
                  onClose={() => setOpenProuctOption(false)}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  disablePortal
                >
                  { item?.productRAM && 
                    item?.productRAMData.map((ram) => {
                      return (
                        <MenuItem className={`${selectedOption === ram && '!bg-primary !text-white'}`} onClick={() => handleOptionClick(ram)}>{ram}</MenuItem>
                      )
                    })
                  }
                  { item?.productWeight && 
                    item?.productWeightData.map((weight) => {
                      return (
                        <MenuItem className={`${selectedOption === weight && '!bg-primary !text-white'}`} onClick={() => handleOptionClick(weight)}>{weight}</MenuItem>
                      )
                    })
                  }
                  { item?.productSize && 
                    item?.productSizeData.map((size) => {
                      return (
                        <MenuItem className={`${selectedOption === size && '!bg-primary !text-white'}`} onClick={() => handleOptionClick(size)}>{size}</MenuItem>
                      )
                    })
                  }
                </Menu>
              </div>
            )}

            <div className="relative">
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={() => setOpenQty(true)}
                className=" !bg-[#f1f1f1] !capitalize !text-black !py-1 !px-3 !cursor-pointer !rounded-md !font-medium !mt-2 !text-[12px]"
              >
                Qty: {selectedQty} <GoTriangleDown />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={selectedQty}
                open={openQty}
                onClose={() => setOpenQty(false)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                disablePortal
              >
                {
                  Array.from({length: item?.countInStock}, (_, i) => <MenuItem className={`${selectedQty === i+1 && '!bg-primary !text-white'}`} onClick={() => handleQtyClick(i+1)}>{i+1}</MenuItem>)
                }
              </Menu>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="oldPrice text-primary text-[14px] font-medium">
              &#8377;{item?.price}
            </span>
            <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
              &#8377;{item?.oldPrice}
            </span>
            <span className="oldPrice text-red-500 text-[14px] font-[500]">
              {item?.discount}% off
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItem;
