import React, { useContext, useEffect } from "react";

import WishlistItem from "./WishlistItem";
import AccountSidebar from "../My-Account/AccountSidebar";
import { MyContext } from "../../App";
import { getData } from "../../utils/api";

function Wishlist() {
  const context = useContext(MyContext);
  useEffect(() => {
    context?.getMyWishlistData();
  }, [])
  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        <div className="left-col w-[20%]">
          <AccountSidebar />
        </div>
        <div className="right-col w-[70%]">
        <div className="shadow-md rounded-md mb-10 bg-white">
            <div className="px-3 py-2 border-b mb-1">
            <h2>My Wishlist</h2>
          <p>
            There are <span className="text-red-500 font-medium">{context?.myWishlistData?.length || 0}</span>{" "}
            products in your wishlist
          </p>
            </div>
            {
              context?.myWishlistData?.length > 0 && context?.myWishlistData?.map((item) => {
                return <WishlistItem key={item?._id} product={item} />
              })
            }
          </div>
        </div>
      </div>
    </section>
  );
}

export default Wishlist;