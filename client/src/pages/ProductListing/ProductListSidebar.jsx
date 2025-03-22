import React, { useContext, useEffect, useState } from "react";
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
import { MyContext } from "../../App";
import { useLocation } from "react-router-dom";
import { postData } from "../../utils/api";

function ProductListSidebar({
  setProductsData,
  setIsLoading,
  isLoading,
  page,
  limit,
  setTotalPages,
}) {
  const [isOpenCategoryFliter, setIsOpenCategoryFilter] = useState(true);

  const [price, setPrice] = useState([10, 800000]);
  const context = useContext(MyContext);

  const [filters, setFilters] = useState({
    catId: [],
    subCatId: [],
    thirdSubCatId: [],
    rating: [],
    minPrice: price[0],
    maxPrice: price[1],
    page,
    limit,
  });

  const location = useLocation();

  const handleCheckBoxChange = (name, id) => {
    const currentValues = filters[name] || [];
    const updatedValues = currentValues?.includes(id) ? currentValues?.filter((val) => val !== id) : [...currentValues, id];
    setFilters((prev) => ({ ...prev, [name]: updatedValues }));
  };

  useEffect(() => {
    const URL = window.location.href;
    const searchParams = new URLSearchParams(location.search);

    if (URL.includes("catId")) {
      const categoryId = searchParams.get("catId");
      const catArr = [];
      catArr.push(categoryId);
      filters.catId = catArr;
      filters.subCatId = [];
      filters.thirdSubCatId = [];
      filters.rating = [];
    }

    if (URL.includes("subCatId")) {
      const subCategoryId = searchParams.get("subCatId");
      const subCatArr = [];
      subCatArr.push(subCategoryId);
      filters.subCatId = subCatArr;
      filters.catId = [];
      filters.thirdSubCatId = [];
      filters.rating = [];
    }

    if (URL.includes("thirdLevelSubCatId")) {
      const thirdSubCategoryId = searchParams.get("thirdLevelSubCatId");
      const thirdSubCatArr = [];
      thirdSubCatArr.push(thirdSubCategoryId);
      filters.thirdSubCatId = thirdSubCatArr;
      filters.catId = [];
      filters.subCatId = [];
      filters.rating = [];
    }

    filterProducts();
  }, [location]);

  const filterProducts = () => {
    setIsLoading(true);
    postData("/api/product/filters", filters, { withCredentials: false })
      .then((res) => {
        console.log(res);
        if (res?.success) {
          setProductsData(res?.filteredProducts);
          setTotalPages(res?.totalPages);
          window.scrollTo(0, 0);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    filters.page = page;
    filterProducts();
  }, [filters, page]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, minPrice: price[0], maxPrice: price[1] }));
    filterProducts();
  }, [price]);

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
        {context?.categoryData?.length > 0 && (
          <Collapse isOpened={isOpenCategoryFliter}>
            <div className="max-h-[200px] scrollCategory overflow-x-hidden w-full px-2 overflow-y-scroll">
              {context?.categoryData?.map((cat) => {
                return (
                  <FormControlLabel
                    key={cat?._id}
                    value={cat?._id}
                    disabled={isLoading}
                    checked={filters?.catId?.includes(cat?._id)}
                    onChange={() => handleCheckBoxChange("catId", cat?._id)}
                    control={<Checkbox size="small" />}
                    className="w-full"
                    label={cat?.name}
                  />
                );
              })}
            </div>
          </Collapse>
        )}
      </div>
      <hr />
      <div className="box mb-2 mt-3">
        <h3 className="mb-3 w-full text-[18px] font-[600] gap-2 flex items-center">
          Filter By Price{" "}
        </h3>
        <RangeSlider
          value={price}
          step={5}
          onInput={setPrice}
          disabled={isLoading}
          min={50}
          max={200000}
        />
        <div className="flex w-full pt-4 pb-2 priceRange">
          <span className="text-[13px]">
            from: <strong className="text-[black]">&#8377;{price[0]}</strong>
          </span>
          <span className="ml-auto text-[13px]">
            To: <strong className="text-[black]">&#8377;{price[1]}</strong>
          </span>
        </div>
      </div>
      <hr />
      <div className="box mb-2 mt-3">
        <h3 className="mb-3 w-full text-[18px] font-[600] gap-2 flex items-center">
          Filter By Rating{" "}
        </h3>
        <Stack spacing={1}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <FormControlLabel
              key={rating}
              value={rating}
              disabled={isLoading}
              checked={filters?.rating?.includes(rating)}
              onChange={() => handleCheckBoxChange("rating", rating)}
              control={<Checkbox size="small" />}
              className="w-full"
              label={
                <Rating
                  name="rating"
                  size="small"
                  defaultValue={rating}
                  precision={0.5}
                  readOnly
                />
              }
            />
          ))}
        </Stack>
      </div>
    </aside>
  );
}

export default ProductListSidebar;
