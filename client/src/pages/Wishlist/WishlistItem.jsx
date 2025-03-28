import { Button, DialogContent, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa6";
import { deleteData } from "../../utils/api";
import { useContext } from "react";
import { MyContext } from "../../App";
import toast from "react-hot-toast";

function WishlistItem({ product }) {
  const context = useContext(MyContext);
  const handleDeleteItemFromWishlist = (productId) => {
    deleteData(`/api/wishlist/${productId}`, { withCredentials: true }).then(
      (res) => {
        if (res?.data?.success === true) {
          toast.success(res?.data?.message);
          const filteredData = context?.myWishlistData?.filter(
            (item) => item?._id !== productId
          );
          context?.setMyWishlistData(filteredData);
        }
      }
    );
  };
  

  return (
    <>
      <div className="cartItem w-full border-b pb-5 border-gray-300 p-3 flex items-start gap-5">
        <div className="img-section group w-[150px] max-h-[180px] object-cover rounded-lg overflow-hidden">
          <Link to={`/productDetails/${product?.productId}`} className="w-full">
            <img
              src={product?.image}
              alt=""
              className="group-hover:scale-105 transition-all overflow-hidden"
            />
          </Link>
        </div>
        <div className="info w-[80%] relative">
          <Button
            onClick={() => handleDeleteItemFromWishlist(product?._id)}
            className="!rounded-full !absolute !-top-1 !-right-1 !min-h-[35px] !h-[35px] !flex !items-center !justify-center !min-w-[35px] !w-[35px] !text-gray-500"
          >
            <IoMdClose size={"22px"} />
          </Button>
          <span className="text-[13px]">{product?.brand}</span>
          <h3 className="text-[15px] font-medium">
            <Link to={`/productDetails/${product?.productId}`} className="link">
              {product?.productTitle}
            </Link>
          </h3>
          <Rating name="read-only" value={4} size="small" readOnly />
          <div className="flex items-center gap-1">
            <span className="oldPrice text-primary text-[14px] font-medium">
              &#8377;{product?.price}
            </span>
            <span className="oldPrice line-through text-gray-500 text-[14px] font-[500]">
              &#8377;{product?.oldPrice}
            </span>
            <span className="oldPrice text-red-500 text-[14px] font-[500]">
              {product?.discount}% off
            </span>
          </div>
          <br />
          <Button className="!bg-red-500 !text-white !text-[14px] !capitalize gap-2 btn-sm hover:!bg-black">
            <FaCartPlus size={"16px"} /> Add to Cart
          </Button>
        </div>
      </div>
    </>
  );
}

export default WishlistItem;
