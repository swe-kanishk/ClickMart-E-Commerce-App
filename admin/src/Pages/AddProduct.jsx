import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Rating from "@mui/material/Rating";
import UploadProductBox from "../Components/UploadProductBox";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdCloseCircle } from "react-icons/io";
import { Button } from "@mui/material";
import { MdOutlineFileUpload } from "react-icons/md";

function AddProduct() {
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [isProductFeatured, setIsProductFeatured] = useState("");
  const [productRams, setProductRams] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productSize, setProductSize] = useState("");
  const [productRating, setProductRating] = useState(2);

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
  };

  const handleChangeProductFeatured = (event) => {
    setIsProductFeatured(event.target.value);
  };

  const handleChangeProductRams = (event) => {
    setProductRams(event.target.value);
  };

  const handleChangeProductWeight = (event) => {
    setProductWeight(event.target.value);
  };

  const handleChangeProductSize = (event) => {
    setProductSize(event.target.value);
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 px-2">
        <div className="scroll max-h-[78vh] px-6 overflow-y-scroll">
        <div className="grid grid-cols-1 mb-3">
          <div className="col">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              Product Name
            </h3>
            <input
              type="text"
              className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 mb-3">
          <div className="col">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              Description
            </h3>
            <textarea
              type="text"
              className="w-full h-[140px] p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-3">
          <div className="col">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              Product Category
            </h3>
            <Select
              labelId="demo-simple-select-label"
              id="productCatDropDown"
              value={productCat}
              size="small"
              className="w-full !p-1 !bg-white"
              label="Category"
              onChange={handleChangeProductCat}
            >
              <MenuItem value={""}>None</MenuItem>
              <MenuItem value={10}>Fashion</MenuItem>
              <MenuItem value={20}>Beauty</MenuItem>
              <MenuItem value={30}>Electronics</MenuItem>
            </Select>
          </div>
          <div className="col">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              Product Sub Category
            </h3>
            <Select
              labelId="demo-simple-select-label"
              id="productSubCatDropDown"
              value={productSubCat}
              size="small"
              className="w-full !p-1 !bg-white"
              label="Sub Category"
              onChange={handleChangeProductSubCat}
            >
              <MenuItem value={""}>None</MenuItem>
              <MenuItem value={10}>Men</MenuItem>
              <MenuItem value={20}>Women</MenuItem>
              <MenuItem value={30}>Kids</MenuItem>
            </Select>
          </div>
          <div className="col">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              Product Price
            </h3>
            <input
              type="number"
              className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
            />
          </div>
          <div className="col">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              Product Old Price
            </h3>
            <input
              type="number"
              className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-3">
          <div className="col">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              Is Featured?
            </h3>
            <Select
              labelId="demo-simple-select-label"
              id="productCatDropDown"
              value={isProductFeatured}
              size="small"
              className="w-full !p-1 !bg-white"
              label="Category"
              onChange={handleChangeProductFeatured}
            >
              <MenuItem value={10}>True</MenuItem>
              <MenuItem value={20}>False</MenuItem>
            </Select>
          </div>
          <div className="col">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              Product Stock
            </h3>
            <input
              type="number"
              className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
            />
          </div>
          <div className="col">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              Product Brand
            </h3>
            <input
              type="text"
              className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
            />
          </div>
          <div className="col">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              Product Discount
            </h3>
            <input
              type="number"
              className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-3">
          <div className="col">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              Product RAMS
            </h3>
            <Select
              labelId="demo-simple-select-label"
              id="productCatDropDown"
              value={productRams}
              size="small"
              className="w-full !p-1 !bg-white"
              label="Category"
              onChange={handleChangeProductRams}
            >
              <MenuItem value={""}>none</MenuItem>
              <MenuItem value={"4G"}>4G</MenuItem>
              <MenuItem value={"6G"}>6G</MenuItem>
              <MenuItem value={"8G"}>8G</MenuItem>
            </Select>
          </div>
          <div className="col">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              Product Weight
            </h3>
            <Select
              labelId="demo-simple-select-label"
              id="productCatDropDown"
              value={productWeight}
              size="small"
              className="w-full !p-1 !bg-white"
              label="Category"
              onChange={handleChangeProductWeight}
            >
              <MenuItem value={""}>none</MenuItem>
              <MenuItem value={"2kG"}>2kG</MenuItem>
              <MenuItem value={"5kG"}>5kG</MenuItem>
              <MenuItem value={"10kG"}>10kG</MenuItem>
            </Select>
          </div>
          <div className="col">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              Product Size
            </h3>
            <Select
              labelId="demo-simple-select-label"
              id="productCatDropDown"
              value={productSize}
              size="small"
              className="w-full !p-1 !bg-white"
              label="Category"
              onChange={handleChangeProductSize}
            >
              <MenuItem value={""}>none</MenuItem>
              <MenuItem value={"s"}>s</MenuItem>
              <MenuItem value={"m"}>m</MenuItem>
              <MenuItem value={"l"}>l</MenuItem>
              <MenuItem value={"xl"}>xl</MenuItem>
            </Select>
          </div>
          <div className="col">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              Product Stock
            </h3>
            <Rating
              name="simple-controlled"
              value={productRating}
              onChange={(event, newValue) => {
                setProductRating(newValue);
              }}
            />
          </div>
        </div>
        <div className="col w-full py-5">
          <h3 className="font-[600] text-[18px] mb-3">Media & Images</h3>
          <div className="grid grid-cols-7 gap-4">
            <div className="uploadBoxWrapper relative">
              <IoMdCloseCircle className="text-red-500 z-50 absolute -top-2 -right-2 cursor-pointer" size={'30px'} />
              <div className="p-0 rounded-md h-[150px] flex-col w-[100%] flex items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200 hover:border-gray-600 overflow-hidden border-dashed border border-gray-400">
              <LazyLoadImage
                alt={'image'}
                className="w-full h-full object-cover"
                effect="blur"
                src={'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp'}
                wrapperProps={{
                  style: {transitionDelay: "1s"},
                }}
              />
              </div>
            </div>
            <div className="uploadBoxWrapper relative">
              <IoMdCloseCircle className="text-red-500 z-50 absolute -top-2 -right-2 cursor-pointer" size={'30px'} />
              <div className="p-0 rounded-md h-[150px] flex-col w-[100%] flex items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200 hover:border-gray-600 overflow-hidden border-dashed border border-gray-400">
              <LazyLoadImage
                alt={'image'}
                className="w-full h-full object-cover"
                effect="blur"
                src={'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp'}
                wrapperProps={{
                  style: {transitionDelay: "1s"},
                }}
              />
              </div>
            </div>
            <div className="uploadBoxWrapper relative">
              <IoMdCloseCircle className="text-red-500 z-50 absolute -top-2 -right-2 cursor-pointer" size={'30px'} />
              <div className="p-0 rounded-md h-[150px] flex-col w-[100%] flex items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200 hover:border-gray-600 overflow-hidden border-dashed border border-gray-400">
              <LazyLoadImage
                alt={'image'}
                className="w-full h-full object-cover"
                effect="blur"
                src={'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp'}
                wrapperProps={{
                  style: {transitionDelay: "1s"},
                }}
              />
              </div>
            </div>
            <div className="uploadBoxWrapper relative">
              <IoMdCloseCircle className="text-red-500 z-50 absolute -top-2 -right-2 cursor-pointer" size={'30px'} />
              <div className="p-0 rounded-md h-[150px] flex-col w-[100%] flex items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200 hover:border-gray-600 overflow-hidden border-dashed border border-gray-400">
              <LazyLoadImage
                alt={'image'}
                className="w-full h-full object-cover"
                effect="blur"
                src={'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp'}
                wrapperProps={{
                  style: {transitionDelay: "1s"},
                }}
              />
              </div>
            </div>
            <div className="uploadBoxWrapper relative">
              <IoMdCloseCircle className="text-red-500 z-50 absolute -top-2 -right-2 cursor-pointer" size={'30px'} />
              <div className="p-0 rounded-md h-[150px] flex-col w-[100%] flex items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200 hover:border-gray-600 overflow-hidden border-dashed border border-gray-400">
              <LazyLoadImage
                alt={'image'}
                className="w-full h-full object-cover"
                effect="blur"
                src={'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp'}
                wrapperProps={{
                  style: {transitionDelay: "1s"},
                }}
              />
              </div>
            </div>
            <div className="uploadBoxWrapper relative">
              <IoMdCloseCircle className="text-red-500 z-50 absolute -top-2 -right-2 cursor-pointer" size={'30px'} />
              <div className="p-0 rounded-md h-[150px] flex-col w-[100%] flex items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200 hover:border-gray-600 overflow-hidden border-dashed border border-gray-400">
              <LazyLoadImage
                alt={'image'}
                className="w-full h-full object-cover"
                effect="blur"
                src={'https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp'}
                wrapperProps={{
                  style: {transitionDelay: "1s"},
                }}
              />
              </div>
            </div>
            <UploadProductBox multiple={true} />
          </div>
        </div>
        </div>
        <hr />
        <br />
        <Button type="submit" className="!bg-blue-600 mt-3 !text-white !capitalize w-full !p-2 !text-center !font-[500] gap-1"><MdOutlineFileUpload size={'20px'} className="mb-1" /> Publish and View</Button>
      </form>
    </section>
  );
}

export default AddProduct;
