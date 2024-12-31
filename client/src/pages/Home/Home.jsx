import React, { useState } from "react";
import HomeSlider from "./HomeSlider";
import HomeCategorySlider from "./HomeCategorySlider/HomeCategorySlider";
import { FaShippingFast } from "react-icons/fa";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProductsSlider from "./products/ProductsSlider";

function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <HomeSlider />
      <HomeCategorySlider />
      <section className="bg-white py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="left-section">
              <h3 className="text-[20px] font-[600]">Popular Products</h3>
              <p className="text-[14px] font-[400]">
                Don't miss the current offers until the end of this month.
              </p>
            </div>
            <div className="right-section w-[60%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label="Fashion" />
                <Tab label="Bags" />
                <Tab label="Footwear" />
                <Tab label="Electronics" />
                <Tab label="Groceries" />
                <Tab label="Beauty" />
                <Tab label="Jewellery" />
                <Tab label="Wellness" />
              </Tabs>
            </div>
          </div>
          <ProductsSlider />
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="container">
          <div className="freeShipping w-[80%] mx-auto p-6 border-2 border-[#1876D2] flex items-center justify-between">
            <div className="items-center flex gap-3 w-1/5 border-gray-300 border-r-2">
              <FaShippingFast className="scale-x-[-1] text-2xl text-gray-600" />
              <span className="text-xl font-semibold text-gray-600">
                Free Shipping
              </span>
            </div>
            <div className="items-center flex w-3/5 justify-center border-gray-300 border-r-2">
              <span className="text-gray-800">
                Free Delivery Now On Your First Order and over $200
              </span>
            </div>
            <div className="items-center justify-end flex w-1/5">
              <span className="text-xl font-semibold">- Only $200*</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
