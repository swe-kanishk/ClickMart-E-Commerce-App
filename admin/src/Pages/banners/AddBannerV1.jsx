import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import UploadProductBox from "../../Components/UploadProductBox";
import { Button, MenuItem, Select } from "@mui/material";
import { MdOutlineFileUpload } from "react-icons/md";
import { useState } from "react";
import { deleteImages, postData } from "../../utils/api";
import toast from "react-hot-toast";
import { BiLoader } from "react-icons/bi";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";

function AddBannerV1() {
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [cat, setCat] = useState("");
  const [subCat, setSubCat] = useState("");
  const [thirdLevelSubcat, setThirdLevelSubcat] = useState("");

  const context = useContext(MyContext);
  const [formFields, setFormFields] = useState({
    title: "",
    catId: "",
    subCatId: "",
    thirdLevelSubCatId: "",
    images: [],
    textAlignment: '',
    price: "",
  });

  const navigate = useNavigate();

  const setPreviewsfunction = (previewsArr) => {
    const imgArr = previews;
    for (let i = 0; i < previewsArr?.length; i++) {
      imgArr.push(previewsArr[i]);
    }
    setPreviews([]);
    setTimeout(() => {
      setPreviews(imgArr);
      formFields.images = imgArr;
    }, 100);
  };

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRemoveImage = (img, index) => {
    deleteImages("/api/bannerV1/deleteImage", img, {
      withCredentials: true,
    }).then((res) => {
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        setPreviews((prevState) => prevState.toSpliced(index, 1));
      }
    });
  };

  const handleChangeCat = (event) => {
    setCat(event.target.value);
    formFields.catId = event.target.value;
  };

  const handleChangeSubCat = (event) => {
    setSubCat(event.target.value);
    formFields.subCatId = event.target.value;
  };

  const handleChangethirdLevelSubCat = (event) => {
    setThirdLevelSubcat(event.target.value);
    formFields.thirdLevelSubCatId = event.target.value;
  };

  const validValue = (formFields.title && formFields.price && formFields?.images?.length > 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formFields.title === "") {
      toast.error("Please enter banner title!");
      return;
    } else if (formFields.images.length === 0) {
      toast.error("Please add banner image!");
      return;
    } else if (formFields.price === 0) {
      toast.error("Please add banner price!");
      return;
    }
    setIsLoading(true);
    postData("/api/bannerV1", formFields, { withCredentials: true }).then(
      (res) => {
        console.log(res)
        if (res?.success === true) {
          toast.success(res?.message);
            navigate("/bannerV1/list");
          setIsLoading(false);
          setFormFields({
            title: "",
            catId: "",
            subCatId: "",
            thirdLevelSubCatId: "",
            images: [],
            price: "",
            textAlignment: ''
          });
          setPreviews([]);
          context.getCat();
          setTimeout(() => {
            context.setIsOpenFullScreenPannel({ open: false, model: "" });
          }, 1000);
        }
      }
    );
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form px-2" onSubmit={handleSubmit}>
        <div className="scroll max-h-[78vh] pt-4 overflow-y-scroll">
          <div className="grid grid-cols-4 mb-2 gap-5">
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Banner Title
              </h3>
              <input
                type="text"
                onChange={handleOnChangeInput}
                disabled={isLoading}
                name="title"
                placeholder="title"
                value={formFields.title}
                className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
              />
            </div>
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Category
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="catDropDown"
                value={cat}
                disabled={isLoading}
                size="small"
                className="w-full !p-1 !bg-white"
                label="catId"
                onChange={handleChangeCat}
              >
                {context?.categoryData?.length > 0 &&
                  context?.categoryData?.map((cat) => {
                    return (
                      <MenuItem
                        onClick={() => setCat(cat?.name)}
                        key={cat?._id}
                        value={cat?._id}
                      >
                        {cat?.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 mb-2 gap-5">
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Sub Category
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productSubCatDropDown"
                value={subCat}
                disabled={isLoading}
                size="small"
                className="w-full !p-1 !bg-white"
                label="Sub Category"
                onChange={handleChangeSubCat}
              >
                {context?.categoryData?.length > 0 &&
                  context?.categoryData?.map((category) => {
                    return (
                      category?.children?.length > 0 &&
                      category?.children?.map((subCat) => {
                        return (
                          <MenuItem
                            onClick={() => setSubCat(subCat?.name)}
                            key={subCat?._id}
                            value={subCat?._id}
                          >
                            {subCat?.name}
                          </MenuItem>
                        );
                      })
                    );
                  })}
              </Select>
            </div>
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Third Level Sub Category
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="thirdLevelSubCatDropDown"
                value={thirdLevelSubcat}
                size="small"
                disabled={isLoading}
                className="w-full !p-1 !bg-white"
                label="Third Level Sub Category"
                onChange={handleChangethirdLevelSubCat}
              >
                {context?.categoryData?.length > 0 &&
                  context?.categoryData?.map((category) => {
                    return (
                      category?.children?.length > 0 &&
                      category?.children?.map((subCat) => {
                        return (
                          subCat?.children?.length > 0 &&
                          subCat?.children?.map((thirdLevelSubCat) => {
                            return (
                              <MenuItem
                                onClick={() =>
                                  setThirdLevelSubcat(thirdLevelSubCat?.name)
                                }
                                key={thirdLevelSubCat?._id}
                                value={thirdLevelSubCat?._id}
                              >
                                {thirdLevelSubCat?.name}
                              </MenuItem>
                            );
                          })
                        );
                      })
                    );
                  })}
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 mb-0 gap-5">
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">Price</h3>
              <input
                type="number"
                onChange={handleOnChangeInput}
                disabled={isLoading}
                name="price"
                placeholder="price"
                value={formFields.price}
                className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
              />
            </div>
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">Text Alignment</h3>
              <input
                type="text"
                onChange={handleOnChangeInput}
                disabled={isLoading}
                name="textAlignment"
                placeholder="alignment"
                value={formFields.textAlignment}
                className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
              />
            </div>
          </div>
          <br />
          <h3 className="text-[14px] text-black font-[500] mb-1">Image</h3>
          <div className="grid grid-cols-7 gap-4">
            {previews?.length > 0 &&
              previews.map((image, index) => {
                return (
                  <div key={index} className="uploadBoxWrapper relative">
                    <IoMdCloseCircle
                      onClick={() => handleRemoveImage(image, index)}
                      className="text-red-500 z-50 absolute -top-2 -right-2 cursor-pointer"
                      size={"30px"}
                    />
                    <div className="p-0 rounded-md h-[150px] flex-col w-[100%] flex items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200 hover:border-gray-600 overflow-hidden border-dashed border border-gray-400">
                      <LazyLoadImage
                        alt={"image"}
                        className="w-full h-full object-cover"
                        effect="blur"
                        src={image}
                        wrapperProps={{
                          style: { transitionDelay: "1s" },
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            <UploadProductBox
              setPreviewsfunction={setPreviewsfunction}
              multiple={false}
              name={"images"}
              url={"/api/bannerV1/uploadImages"}
            />
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
    </section>
  );
}

export default AddBannerV1;
