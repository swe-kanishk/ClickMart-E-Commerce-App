import "./style.css";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { Button, Tooltip } from "@mui/material";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoIosGitCompare } from "react-icons/io";
import { MdZoomOutMap } from "react-icons/md";
import { IoOpenOutline } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa6";

function ProductItemListView({ product }) {
  return (
    <div className="productItem w-full flex rounded-md overflow-hidden shadow-lg">
      <div className="img-wrapper group max-w-[220px] w-[220px] h-[220px] rounded-md overflow-hidden relative">
        <span className="discout flex items-center absolute top-[10px] left-[10px] z-50 bg-green-600 rounded-[0.2rem] text-white text-[12px] px-1 py-[2px]">
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
        <div className="actions absolute transition-all duration-300 top-[-100%] group-hover:top-[10px] right-[3px] opacity-0 group-hover:opacity-100 flex flex-col">
          <Tooltip placement="right" title="View">
            <Button
              onClick={() => context.setOpenProductDetailsModal(true)}
              className="!rounded-full !w-[35px] !min-h-[35px] !h-[35px] !min-w-[35px] bg-white hover:bg-primary hover:!text-white !text-black"
            >
              <MdZoomOutMap size={"18px"} />
            </Button>
          </Tooltip>
          <Tooltip placement="right" title="Add to wishlist">
            <Button className="!rounded-full !w-[35px] !min-h-[35px] !h-[35px] !min-w-[35px] bg-white hover:bg-primary hover:!text-white !text-black">
              <IoMdHeartEmpty size={"18px"} />
            </Button>
          </Tooltip>
          <Tooltip placement="right" title="Compare">
            <Button className="!rounded-full !w-[35px] !min-h-[35px] !h-[35px] !min-w-[35px] bg-white hover:bg-primary hover:!text-white !text-black">
              <IoIosGitCompare size={"18px"} />
            </Button>
          </Tooltip>
          <Tooltip placement="right" title="See Details">
            <Button className="!rounded-full !w-[35px] !min-h-[35px] !h-[35px] !min-w-[35px] bg-white hover:bg-primary hover:!text-white !text-black">
              <IoOpenOutline size={"18px"} />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="info p-3 px-8 flex w-[70%] flex-col justify-start items-start">
        <h6 className="text-[15px] text-gray-500">
          <Link to={"/"} className="link">
            {product?.brand}
          </Link>
        </h6>
        <h3 className="text-[18px] text-start title my-2 mb-3 font-[500] text-[black]">
          <Link to={"/"} className="link transition-all">
            {product?.name}
          </Link>
        </h3>
        <Rating name="size-small" defaultValue={2} size="small" readOnly />
        <div className="flex items-center gap-4 py-2">
          <span className="oldPrice line-through text-gray-500 text-[16px] font-[500]">
            &#8377;{product?.oldPrice}
          </span>
          <span className="oldPrice text-primary text-[16px] font-medium">
            &#8377;{product?.price}
          </span>
        </div>
        <p className="text-gray-500 text-sm">
         {product?.description?.substr(0, 250).concat('...')}
        </p>
        <Button className="!capitalize !bg-red-500 hover:!bg-gray-600 !font-medium !my-2 !text-[14px] !flex !items-center gap-2 !text-white">
          <FaCartPlus size={"16px"} /> Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductItemListView;
