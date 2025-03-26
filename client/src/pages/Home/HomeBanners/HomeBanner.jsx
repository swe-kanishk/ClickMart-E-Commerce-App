import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function HomeBanner({banner}) {
  return (
      <div className="group overflow-hidden w-full h-full rounded-lg relative">
        <div className={`absolute flex flex-col pr-2 pl-5 justify-center w-[50%] h-[100%] z-50 ${banner?.textAlignment === "left" ? "left-0" : "right-0"}`}>
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