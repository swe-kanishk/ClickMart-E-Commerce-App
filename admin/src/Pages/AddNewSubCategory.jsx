import React, { useState } from "react";
import 'react-lazy-load-image-component/src/effects/blur.css';
import UploadProductBox from "../Components/UploadProductBox";
import { Button, MenuItem, Select } from "@mui/material";
import { MdOutlineFileUpload } from "react-icons/md";

function AddNewSubCategory() {
  const [category, setCategory] = useState('')
  const [newSubcategory, setNewSubCategory] = useState('')

  const handleChangeCat = (event) => {
    setCategory(event.target.value);
  };
  return (
    <section className="p-5 bg-gray-50">
      <form className="form px-2">
        <div className="scroll max-h-[78vh] pt-4 overflow-y-scroll">
        <div className="grid grid-cols-4 gap-5 mb-3">
          <div className="col">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              Category Name
            </h3>
            <Select
              labelId="demo-simple-select-label"
              id="productCatDropDown"
              value={category}
              size="small"
              className="w-full !p-1 !bg-white"
              label="Category"
              onChange={handleChangeCat}
            >
              <MenuItem value={""}>none</MenuItem>
              <MenuItem value={"4G"}>Fashion</MenuItem>
              <MenuItem value={"6G"}>Grocery</MenuItem>
              <MenuItem value={"8G"}>Electronics</MenuItem>
            </Select>
          </div>
          <div className="col">
            <h3 className="text-[14px] text-black font-[500] mb-1">
              Sub Category Name
            </h3>
            <input
              type="text"
              className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
            />
          </div>
        </div>
        </div>
        <br />
        <Button type="submit" className="!bg-blue-600 mt-3 !text-white !capitalize !max-w-[250px] w-full !p-2 !text-center !font-[500] gap-1"><MdOutlineFileUpload size={'20px'} className="mb-1" /> Publish and View</Button>
     
      </form>
    </section>
  );
}

export default AddNewSubCategory;
