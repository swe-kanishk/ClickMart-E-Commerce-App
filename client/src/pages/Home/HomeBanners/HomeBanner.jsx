import React from "react";
import { Link } from "react-router-dom";

function HomeBanner({banner}) {
  return (
      <div className="group overflow-hidden w-full rounded-lg relative">
        <div className={`absolute flex flex-col px-4 justify-center w-[55%] h-[100%] z-50 ${banner?.textAlignment}-0`}>
          <h3 className="font-medium pb-2 text-xl">
            {banner?.title}
          </h3>
          <span className="text-red-500 font-medium text-[20px]">&#8377;{banner?.price}</span>
          <Link to={`/productListing?catId=${banner?.catId}&subCatId=${banner?.subCatId}&thirdLevelSubCatId=${banner?.thirdLevelSubCatId}`} className="btn text-black hover:text-red-500 block underline underline-offset-2 mt-4">Shop Now</Link>
        </div>
        <img
          src={banner?.images?.[0]}
          alt=""
          className="group-hover:scale-105 min-h-[100%] rounded-lg max-h-[100%] duration-500 transition-all object-cover"
        />
      </div>
  );
}

export default HomeBanner;