import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Collapse } from "react-collapse";
import { FaAngleDown } from "react-icons/fa6";
import { Button } from "@mui/material";
import { FaShopify } from "react-icons/fa";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

function ProductListSidebar() {
  const [isOpenCategoryFliter, setIsOpenCategoryFilter] = useState(true);
  const [isOpenAvailabilityFliter, setIsOpenAvailabilityFilter] =
    useState(true);
  const [isOpenSizeFliter, setIsOpenSizeFilter] = useState(true);

  return (
    <aside className="sidebar w-full h-full">
      <div className="box mb-2 mt-3">
        <h3 className="mb-3 w-full text-[18px] font-[600] gap-2 flex items-center">
          <FaShopify size={"18px"} /> Shop By Category{" "}
          <Button
            onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFliter)}
            className="!ml-auto cursor-pointer !text-black !min-h-[30px] !min-w-[30px] !h-[30px] !w-[30px]"
          >
            <FaAngleDown
              className={`${
                isOpenCategoryFliter && "rotate-[180deg]"
              } transition-all duration-500`}
            />
          </Button>
        </h3>
        <Collapse isOpened={isOpenCategoryFliter}>
          <div className="max-h-[200px] scrollCategory overflow-x-hidden w-full px-2 overflow-y-scroll">
            <FormControlLabel
              control={<Checkbox size="small" />}
              className="w-full"
              label="Fashion"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              className="w-full"
              label="Electronics"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              className="w-full"
              label="Bags"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              className="w-full"
              label="Footwear"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              className="w-full"
              label="Groceries"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              className="w-full"
              label="Jewellery"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              className="w-full"
              label="Beauty"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              className="w-full"
              label="Wellness"
            />
          </div>
        </Collapse>
      </div>
      <hr />
      <div className="box mb-2 mt-3">
        <h3 className="mb-3 w-full text-[18px] font-[600] gap-2 flex items-center">
          Filter By Price{" "}
        </h3>
        <RangeSlider />
        <div className="flex w-full pt-4 pb-2 priceRange">
          <span className="text-[13px]">
            from: <strong className="text-[black]">$66</strong>
          </span>
          <span className="ml-auto text-[13px]">
            To: <strong className="text-[black]">$229</strong>
          </span>
        </div>
      </div>
      <hr />
      <div className="box mb-2 mt-3">
        <h3 className="mb-3 w-full text-[18px] font-[600] gap-2 flex items-center">
          Availability{" "}
          <Button
            onClick={() =>
              setIsOpenAvailabilityFilter(!isOpenAvailabilityFliter)
            }
            className="!ml-auto cursor-pointer !text-black !min-h-[30px] !min-w-[30px] !h-[30px] !w-[30px]"
          >
            <FaAngleDown
              className={`${
                isOpenCategoryFliter && "rotate-[180deg]"
              } transition-all duration-500`}
            />
          </Button>
        </h3>
        <Collapse isOpened={isOpenAvailabilityFliter}>
          <div className="max-h-[200px] scrollCategory overflow-x-hidden w-full px-2 overflow-y-scroll">
            <FormControlLabel
              control={<Checkbox size="small" />}
              className="w-full"
              label="Available (22)"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              className="w-full"
              label="In Stock (11)"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              className="w-full"
              label="Not Available (1)"
            />
          </div>
        </Collapse>
      </div>
      <hr />
      <div className="box mb-2 mt-3">
        <h3 className="mb-3 w-full text-[18px] font-[600] gap-2 flex items-center">
          Size{" "}
          <Button
            onClick={() => setIsOpenSizeFilter(!isOpenSizeFliter)}
            className="!ml-auto cursor-pointer !text-black !min-h-[30px] !min-w-[30px] !h-[30px] !w-[30px]"
          >
            <FaAngleDown
              className={`${
                isOpenCategoryFliter && "rotate-[180deg]"
              } transition-all duration-500`}
            />
          </Button>
        </h3>
        <Collapse isOpened={isOpenSizeFliter}>
          <div className="max-h-[200px] scrollCategory overflow-x-hidden w-full px-2 overflow-y-scroll">
            <FormControlLabel
              control={<Checkbox size="small" />}
              className="w-full"
              label="Small"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              className="w-full"
              label="Medium"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              className="w-full"
              label="Large"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              className="w-full"
              label="XL"
            />
            <FormControlLabel
              control={<Checkbox size="small" />}
              className="w-full"
              label="XXL"
            />
          </div>
        </Collapse>
      </div>
      <hr />
      <div className="box mb-2 mt-3">
        <h3 className="mb-3 w-full text-[18px] font-[600] gap-2 flex items-center">
          Filter By Rating{" "}
        </h3>
        <Stack spacing={1}>
          <Rating
            name="half-rating"
            size="small"
            defaultValue={1}
            precision={0.5}
            readOnly
          />
          <Rating
            name="half-rating"
            size="small"
            defaultValue={2}
            precision={0.5}
            readOnly
          />
          <Rating
            name="half-rating"
            size="small"
            defaultValue={3}
            precision={0.5}
            readOnly
          />
          <Rating
            name="half-rating"
            size="small"
            defaultValue={4}
            precision={0.5}
            readOnly
          />
          <Rating
            name="half-rating"
            size="small"
            defaultValue={5}
            precision={0.5}
            readOnly
          />
        </Stack>
      </div>
    </aside>
  );
}

export default ProductListSidebar;
