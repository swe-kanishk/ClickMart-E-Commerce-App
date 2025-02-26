import React, { useContext, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import UploadProductBox from "../Components/UploadProductBox";
import { Button, MenuItem, Select } from "@mui/material";
import { MdOutlineFileUpload } from "react-icons/md";
import { MyContext } from "../App";
import { postData } from "../utils/api";
import toast from "react-hot-toast";
import { BiLoader } from "react-icons/bi";

function AddNewSubCategory() {
  const [category, setCategory] = useState("");
  const [category2, setCategory2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });

  const [formFields2, setFormFields2] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });

  const context = useContext(MyContext);

  const handleChangeCat = (event) => {
    setCategory(event.target.value);
    setFormFields((prevState) => ({
      ...prevState,
      parentId: event.target.value,
    }));
  };

  const handleChangeCat2 = (event) => {
    setCategory2(event.target.value);
    setFormFields2((prevState) => ({
      ...prevState,
      parentId: event.target.value,
    }));
  };

  const selectCatName = (catName) => {
    setFormFields((prevState) => ({ ...prevState, parentCatName: catName }));
  };

  const selectCatName2 = (catName) => {
    setFormFields2((prevState) => ({ ...prevState, parentCatName: catName }));
  };

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOnChangeInput2 = (e) => {
    const { name, value } = e.target;
    setFormFields2((prevState) => ({ ...prevState, [name]: value }));
  };

  const validValue = Object.values(formFields).every((el) => el);
  const validValue2 = Object.values(formFields2).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formFields.name === "" || formFields2.name === "") {
      toast.error("Please enter sub category name!");
      return;
    } else if (formFields.parentCatName === null || formFields.parentCatName === null) {
      toast.error("Please select parent category!");
      return;
    }
    setIsLoading(true);
    postData("/api/category", formFields, { withCredentials: true }).then(
      (res) => {
        if (res?.success === true) {
          toast.success(res?.message);
          setIsLoading(false);
          setFormFields({
            name: "",
            parentCatName: "",
          });
          context.getCat();
          setTimeout(() => {
            context.setIsOpenFullScreenPannel({ open: false, model: "" });
          }, 1000);
        }
      }
    );
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    if (formFields2.name === "") {
      toast.error("Please enter third level category name!");
      return;
    } else if (formFields2.parentCatName === null) {
      toast.error("Please select parent category!");
      return;
    }
    setIsLoading2(true);
    postData("/api/category", formFields2, { withCredentials: true }).then(
      (res) => {
        if (res?.success === true) {
          toast.success(res?.message);
          setIsLoading2(false);
          setFormFields2({
            name: "",
            parentCatName: null,
          });
          context.getCat();
          setTimeout(() => {
            context.setIsOpenFullScreenPannel({ open: false, model: "" });
          }, 1000);
        }
      }
    );
  };
  return (
    <section className="p-5 bg-gray-50 grid grid-cols-2 gap-8">
      <form className="form px-2" onSubmit={handleSubmit}>
        <h4 className="font-[600]">Add Sub Category</h4>
        <div className="scroll max-h-[78vh] pt-4 overflow-y-scroll">
          <div className="grid grid-cols-2 gap-5 mb-3">
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Category Name
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDropDown"
                value={category}
                disabled={isLoading}
                size="small"
                className="w-full !p-1 !bg-white"
                label="Category"
                onChange={handleChangeCat}
              >
                {context?.categoryData?.length > 0 &&
                  context?.categoryData.map((cat) => {
                    return (
                      <MenuItem
                        onClick={() => selectCatName(cat?.name)}
                        key={cat?._id}
                        name={cat?.name}
                        value={cat?._id}
                      >
                        {cat?.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Sub Category Name
              </h3>
              <input
                type="text"
                onChange={handleOnChangeInput}
                name="name"
                value={formFields?.name}
                disabled={isLoading}
                className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
              />
            </div>
          </div>
        </div>
        <br />
        <Button
          disabled={!validValue || isLoading}
          type="submit"
          className={`${
            !validValue || isLoading ? "!bg-blue-500" : "!bg-blue-600"
          } mt-3 !text-white !capitalize !max-w-[250px] w-full !p-2 !text-center !font-[500] gap-1`}
        >
          {isLoading ? (
            <BiLoader size={"22px"} className="animate-spin" />
          ) : (
            <>
              <MdOutlineFileUpload size={"20px"} className="mb-1" /> Publish and
              View
            </>
          )}
        </Button>
      </form>

      <form className="form px-2" onSubmit={handleSubmit2}>
        <h4 className="font-[600]">Add Third Level Category</h4>
        <div className="scroll max-h-[78vh] pt-4 overflow-y-scroll">
          <div className="grid grid-cols-2 gap-5 mb-3">
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Category Name
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDropDown"
                value={category2}
                disabled={isLoading2}
                size="small"
                className="w-full !p-1 !bg-white"
                label="Category"
                onChange={handleChangeCat2}
              >
                {context?.categoryData?.length > 0 &&
                  context?.categoryData.map((cat) => {
                    return (cat?.children?.length > 0 &&
                      cat?.children?.map((child) => {
                        return (
                          <MenuItem
                            onClick={() => selectCatName2(child?.name)}
                            key={child?._id}
                            name={child?.name}
                            value={child?._id}
                          >
                            {child?.name}
                          </MenuItem>
                        );
                      })
                    )
                  })}
              </Select>
            </div>
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Sub Category Name
              </h3>
              <input
                type="text"
                onChange={handleOnChangeInput2}
                name="name"
                value={formFields2?.name}
                disabled={isLoading2}
                className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
              />
            </div>
          </div>
        </div>
        <br />
        <Button
          disabled={!validValue2 || isLoading2}
          type="submit"
          className={`${
            !validValue2 || isLoading2 ? "!bg-blue-500" : "!bg-blue-600"
          } mt-3 !text-white !capitalize !max-w-[250px] w-full !p-2 !text-center !font-[500] gap-1`}
        >
          {isLoading2 ? (
            <BiLoader size={"22px"} className="animate-spin" />
          ) : (
            <>
              <MdOutlineFileUpload size={"20px"} className="mb-1" /> Publish and
              View
            </>
          )}
        </Button>
      </form>
    </section>
  );
}

export default AddNewSubCategory;
