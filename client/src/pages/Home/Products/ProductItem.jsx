import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button, Tooltip } from "@mui/material";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { IoIosGitCompare } from "react-icons/io";
import { MdZoomOutMap } from "react-icons/md";
import { IoOpenOutline } from "react-icons/io5";
import { MyContext } from "../../../App";
import { FaCartPlus } from "react-icons/fa6";
import { editData } from "../../../utils/api";
import toast from "react-hot-toast";

function ProductItem({ product }) {
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cartId, setCartId] = useState(null);
  const [activeTab, setActiveTab] = useState(null);
  const [isShowTabs, setIsShowTabs] = useState(false);
  const [showTabValue, setShowTabValue] = useState(null);

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const handleAddToMyWishlist = () => {
    context?.addToMyWishlist(product);
  };

  useEffect(() => {
    const item = context?.cartData?.find(
      (item) => item?.productId === product?._id
    );
    setQuantity(item?.quantity || 1);
  }, [product?._id, context?.cartData]);

  useEffect(() => {
    const isAdded = context?.myWishlistData?.filter((item) =>
      item?.productId?.includes(product?._id)
    );
    isAdded?.length > 0
      ? setIsAddedToWishlist(true)
      : setIsAddedToWishlist(false);
  }, [context?.myWishlistData]);

  const addItemToCart = () => {
    if(product?.size?.length !== 0 && isShowTabs === false) {
      setIsShowTabs(true)
      toast.error('Please select item size!');
      return
    }
    if(product?.productRam?.length !== 0 && isShowTabs === false) {
      setIsShowTabs(true)
      toast.error('Please select item ram!');
      return
    }
    if(product?.weight?.length !== 0 && isShowTabs === false) {
      setIsShowTabs(true)
      toast.error('Please select item weight!');
      return
    }

    const productData = {
      productId: product?._id,
      productTitle: product?.name,
      image: product?.images?.[0],
      quantity: quantity || 1,
      countInStock: product?.countInStock,
      subTotal: parseInt(product?.price) * quantity,
      rating: product?.rating?.[0] || 1,
      price: product?.price,
      oldPrice: product?.oldPrice,
      discount: product?.discount,
      productSize: product?.size?.length > 0 ? showTabValue : '',
      productRAM: product?.productRam?.length > 0 ? showTabValue : '',
      productWeight: product?.weight?.length > 0 ? showTabValue : '',
      brand: product?.brand,
      productRAMData: product?.productRam,
      productSizeData: product?.size,
      productWeightData: product?.weight
    };

    setIsShowTabs(false);
    context?.addToCart(productData);
  };

  const handleChangeQty = (e) => {
    const newQuantity =
      e?.currentTarget?.id === "increment-button"
        ? Math.min(quantity + 1, product?.countInStock)
        : quantity === 1
        ? context?.removeItemFromCart(cartId)
        : quantity - 1;

    if (newQuantity !== quantity) {
      setQuantity(newQuantity);

      editData(
        "/api/cart",
        { quantity: newQuantity, productId: product?._id },
        { withCredentials: true }
      ).then((res) => {
        if (res?.data?.success) {
          toast.success(res?.data?.message);
          context?.setCartData((prevState) =>
            prevState.map((item) =>
              item?.productId === product?._id
                ? res?.data?.updatedCartItem
                : item
            )
          );
        }
      });
    }
    return;
  };

  useEffect(() => {
    const item = context?.cartData?.find(
      (item) => item?.productId === product?._id
    );
    item ? setCartId(item?._id) : setCartId(null);
  }, [context?.cartData]);

  const handleClickActiveTab = (index, value) => { 
    setShowTabValue(value)
    setActiveTab(index);
  };
  return (
    <div className="productItem border relative rounded-md w-[300px] max-h-[410px] min-h-[410px] overflow-hidden shadow-lg">
      <div className="img-wrapper group h-[200px] max-w-[300px] rounded-md overflow-hidden relative">
        <span className="discout flex items-center absolute top-[10px] left-[10px] z-50 bg-red-500 rounded-[0.2rem] text-white text-[12px] px-1 py-[2px]">
          {product?.discount}% off
        </span>
        <Link to={`/productDetails/${product?._id}`}>
          <img
            src={product?.images?.[0]}
            alt=""
            className={` ${
              product?.images?.[1] && "group-hover:opacity-0 group-hover:hidden"
            }  duration-700 transition-all object-cover`}
          />
          {product?.images?.[1] && (
            <img
              src={product?.images?.[1]}
              alt=""
              className="w-full h-full group-hover:scale-105 transition-all duration-700  opacity-0 group-hover:opacity-100 hidden group-hover:flex"
            />
          )}
        </Link>
        {isShowTabs === true && (
          <div className="flex gap-2 items-center justify-center absolute top-[0px] left-[0px] w-full h-full z-[55] bg-[#131212cb] text-white text-[12px] px-1 py-[2px]">
            {product?.size?.length > 0 &&
              product?.size?.map((size, index) => {
                return (
                  <span
                    onClick={() => handleClickActiveTab(index, size)}
                    key={index}
                    className={`flex items-center cursor-pointer justify-center p-1 text-[14px] ${
                      activeTab === index && "bg-primary text-white"
                    } bg-[#f6f6f6f1] min-w-[25px] h-[25px] rounded-sm cursor- text-gray-700 hover:bg-white`}
                  >
                    {size}
                  </span>
                );
              })}
            {product?.productRam?.length > 0 &&
              product?.productRam?.map((ram, index) => {
                return (
                  <span
                    onClick={() => handleClickActiveTab(index, ram)}
                    key={index}
                    className={`flex items-center cursor-pointer justify-center p-1 text-[14px] ${
                      activeTab === index && "bg-primary text-white"
                    } bg-[#f6f6f6f1] min-w-[25px] h-[25px] rounded-sm cursor- text-gray-700 hover:bg-white`}
                  >
                    {ram}
                  </span>
                );
              })}
            {product?.weight?.length > 0 &&
              product?.weight?.map((weight, index) => {
                return (
                  <span
                    onClick={() => handleClickActiveTab(index, weight)}
                    key={index}
                    className={`flex items-center cursor-pointer justify-center p-1 text-[14px] ${
                      activeTab === index && "bg-primary text-white"
                    } bg-[#f6f6f6f1] min-w-[25px] h-[25px] rounded-sm cursor-pointer text-gray-700 hover:bg-white`}
                  >
                    {weight}
                  </span>
                );
              })}
          </div>
        )}
        <div className="actions absolute transition-all gap-1.5 duration-300 top-[-100%] group-hover:top-[10px] right-[12px] opacity-0 group-hover:opacity-100 flex flex-col">
          <Tooltip placement="right" title="View">
            <Button
              onClick={() =>
                context.setOpenProductDetailsModal({ open: true, product })
              }
              className="!rounded-full !w-[35px] !min-h-[35px] !h-[35px] !min-w-[35px] !shadow-md !bg-white hover:!bg-primary hover:!text-white !text-black"
            >
              <MdZoomOutMap size={"18px"} />
            </Button>
          </Tooltip>
          <Tooltip placement="right" title="Add to wishlist">
            <Button
              onClick={() => handleAddToMyWishlist(product)}
              className="!rounded-full !w-[35px] !min-h-[35px] !h-[35px] !min-w-[35px] !shadow-md !bg-white hover:!bg-primary hover:!text-white !text-black"
            >
              {isAddedToWishlist ? (
                <IoMdHeart className="text-pink-400" size={"18px"} />
              ) : (
                <IoMdHeartEmpty size={"18px"} />
              )}
            </Button>
          </Tooltip>
          <Tooltip placement="right" title="Compare">
            <Button className="!rounded-full !w-[35px] !min-h-[35px] !h-[35px] !min-w-[35px] !shadow-md !bg-white hover:!bg-primary hover:!text-white !text-black">
              <IoIosGitCompare size={"18px"} />
            </Button>
          </Tooltip>
          <Tooltip placement="right" title="See Details">
            <Button
              onClick={() => navigate(`/productDetails/${product?._id}`)}
              className="!rounded-full !w-[35px] !min-h-[35px] !h-[35px] !min-w-[35px] !shadow-md !bg-white hover:!bg-primary hover:!text-white !text-black"
            >
              <IoOpenOutline size={"18px"} />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="info p-3 pb-0 flex flex-col w-[250px] justify-start items-start">
        <h6 className="text-[13px]">
          <span className="link">{product?.brand}</span>
        </h6>
        <h3 className="text-[15px] text-start title my-2 font-[500] text-[black]">
          <Link
            to={`/productDetails/${product?._id}`}
            className="link transition-all"
          >
            {product?.name?.length > 55
              ? product?.name?.substr(0, 55).concat("...")
              : product?.name}
          </Link>
        </h3>
        <Rating
          name="size-small"
          defaultValue={product?.rating}
          size="small"
          readOnly
        />
        <div className="flex items-center gap-3 pt-2">
          <span className="oldPrice line-through text-red-500 text-[16px] font-[400]">
            &#8377;{product?.oldPrice}
          </span>
          <span className="price text-green-600 text-[16px] font-medium">
            &#8377;{product?.price}
          </span>
        </div>
      </div>
      <div className="flex absolute bottom-3 w-full px-2">
        {cartId ? (
          <div className="relative flex items-center max-w-full border border-blue-400 rounded-lg">
            <button
              onClick={handleChangeQty}
              type="button"
              id="decrement-button"
              data-input-counter-decrement="quantity-input"
              className="bg-blue-100  hover:bg-blue-200 border-r border-blue-400 rounded-s-lg p-3 h-10"
            >
              <svg
                className="w-3 h-3 text-blue-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              readOnly
              type="number"
              value={quantity}
              id="quantity-input"
              data-input-counter
              aria-describedby="helper-text-explanation"
              className="bg-blue-50 border-x-0 outline:none focus:outline-none border-t-blue-300  border-b-blue-300 h-10 text-center text-blue-600 font-[600] text-sm block w-full py-2.5"
              required
            />
            <button
              onClick={handleChangeQty}
              type="button"
              id="increment-button"
              data-input-counter-increment="quantity-input"
              className="bg-blue-100  hover:bg-blue-200  border-blue-400 border-l rounded-e-lg p-3 h-10"
            >
              <svg
                className="w-3 h-3 text-blue-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
        ) : (
          <Button
            disabled={isLoading}
            onClick={addItemToCart}
            type="submit"
            className={`!w-full !capitalize ${
              isLoading ? "!bg-red-400" : "!bg-blue-500"
            }  !text-white !py-2 !font-medium hover:!bg-blue-400`}
          >
            {isLoading ? (
              <BiLoader size={"22px"} className="animate-spin" />
            ) : (
              <span className="flex items-center gap-3">
                Add to Cart <FaCartPlus size={20} />
              </span>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProductItem;
