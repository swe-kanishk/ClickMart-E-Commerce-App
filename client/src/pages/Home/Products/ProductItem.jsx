import React, { useContext } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button, Tooltip } from "@mui/material";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosGitCompare } from "react-icons/io";
import { MdZoomOutMap } from "react-icons/md";
import { IoOpenOutline } from "react-icons/io5";
import { MyContext } from "../../../App";

function ProductItem({ product }) {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  return (
    <div className="productItem border rounded-md w-[250px] max-h-[410px] min-h-[400px] overflow-hidden shadow-lg">
      <div className="img-wrapper group h-[250px] max-w-[250px] rounded-md overflow-hidden relative">
        <span className="discout flex items-center absolute top-[10px] left-[10px] z-50 bg-red-500 rounded-[0.2rem] text-white text-[12px] px-1 py-[2px]">
          {product?.discount}% off
        </span>
        <Link to={`/productDetails/${product?._id}`}>
          <img
            src={product?.images?.[0]}
            alt=""
            className={` ${product?.images?.[1] && 'group-hover:opacity-0 group-hover:hidden'}  duration-700 transition-all object-cover`}
          />
          {product?.images?.[1] && (
            <img
              src={product?.images?.[1]}
              alt=""
              className="w-full h-full group-hover:scale-105 transition-all duration-700  opacity-0 group-hover:opacity-100 hidden group-hover:flex"
            />
          )}
        </Link>
        <div className="actions absolute transition-all gap-1.5 duration-300 top-[-100%] group-hover:top-[10px] right-[12px] opacity-0 group-hover:opacity-100 flex flex-col">
          <Tooltip placement="right" title="View">
            <Button
              onClick={() => context.setOpenProductDetailsModal({open: true, product})}
              className="!rounded-full !w-[35px] !min-h-[35px] !h-[35px] !min-w-[35px] !shadow-md !bg-white hover:!bg-primary hover:!text-white !text-black"
            >
              <MdZoomOutMap size={"18px"} />
            </Button>
          </Tooltip>
          <Tooltip placement="right" title="Add to wishlist">
            <Button className="!rounded-full !w-[35px] !min-h-[35px] !h-[35px] !min-w-[35px] !shadow-md !bg-white hover:!bg-primary hover:!text-white !text-black">
              <IoMdHeartEmpty size={"18px"} />
            </Button>
          </Tooltip>
          <Tooltip placement="right" title="Compare">
            <Button className="!rounded-full !w-[35px] !min-h-[35px] !h-[35px] !min-w-[35px] !shadow-md !bg-white hover:!bg-primary hover:!text-white !text-black">
              <IoIosGitCompare size={"18px"} />
            </Button>
          </Tooltip>
          <Tooltip placement="right" title="See Details">
            <Button onClick={() => navigate(`/productDetails/${product?._id}`)} className="!rounded-full !w-[35px] !min-h-[35px] !h-[35px] !min-w-[35px] !shadow-md !bg-white hover:!bg-primary hover:!text-white !text-black">
              <IoOpenOutline size={"18px"} />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="info p-3 flex flex-col w-[250px] justify-start items-start">
        <h6 className="text-[13px]">
          <span className="link">
            {product?.brand}
          </span>
        </h6>
        <h3 className="text-[15px] text-start title my-2 font-[500] text-[black]">
          <Link to={`/productDetails/${product?._id}`} className="link transition-all">
            {product?.name?.length > 55 ? product?.name?.substr(0,55).concat('...') : product?.name}
          </Link>
        </h3>
        <Rating
          name="size-small"
          defaultValue={product?.rating}
          size="small"
          readOnly
        />
        <div className="flex items-center gap-4 py-2">
          <span className="oldPrice line-through text-gray-500 text-[16px] font-[500]">
          &#8377;{product?.oldPrice}
          </span>
          <span className="price text-primary text-[16px] font-medium">
          &#8377;{product?.price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
