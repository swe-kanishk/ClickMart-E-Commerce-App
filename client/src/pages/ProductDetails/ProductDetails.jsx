import { Breadcrumbs } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ProductZoom from "../../components/ProductZoom";
import Rating from "@mui/material/Rating";

function ProductDetails() {
  return (
    <>
      <div className="py-5">
        <div className="container">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              className="link transition"
              color="inherit"
              href="/"
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link transition"
            >
              Fashion
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/"
              className="link transition"
            >
              Female Black Top and Plazo
            </Link>
          </Breadcrumbs>
        </div>
      </div>
      <section className="py-5 bg-white">
        <div className="container flex gap-8">
          <div className="productZoomContainer w-[40%] overflow-hidden">
            <ProductZoom />
          </div>
          <div className="productContent w-[60%]">
          <div className="flex items-center gap-3 mb-2">
              <span className="text-gray-600">
                Brands:{" "}
                <span className="font-[500] text-black opacity-80 text-[14px]">
                  Zara
                </span>
              </span>
              <Rating
                name="size-rating"
                size="small"
                defaultValue={3.6}
                readOnly
              />
              <span className="text-[13px] cursor-pointer text-gray-600">Review (5)</span>
            </div>
            <h1 className="text-[22px] font-[600] mb-1">
              Female Black Top and Plazo
            </h1>
            <p className="text-gray-600 text-sm">This chic black top paired with elegant plazo pants is perfect for any occasion. Comfortable and stylish, it offers a flattering fit and versatile look, ideal for casual outings, work, or evening events.</p>
            <div className="flex items-center gap-4 mt-4">
                <span className="oldPrice line-through text-gray-500 text-[15px] font-[500]">
                    $63.00
                </span>
                <span className="price text-primary text-[15px] font-[600]">
                    $42.00
                </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
