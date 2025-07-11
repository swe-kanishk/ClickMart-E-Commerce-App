import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import UploadProductBox from "../../Components/UploadProductBox";
import { Button } from "@mui/material";
import { MdOutlineFileUpload } from "react-icons/md";
import { useState } from "react";
import { deleteImages, postData } from "../../utils/api";
import toast from "react-hot-toast";
import { BiLoader } from "react-icons/bi";
import { useEffect } from "react";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";

function AddNewCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const context = useContext(MyContext);
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
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
    deleteImages("/api/category/delete-image", img, {
      withCredentials: true,
    }).then((res) => {
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        setPreviews((prevState) => prevState.toSpliced(index, 1));
      }
    });
  };

  const validValue = Object.values(formFields).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formFields.name === "") {
      toast.error("Please enter category name!");
      return;
    } else if (formFields.images.length === 0) {
      toast.error("Please add images!");
      return;
    }
    setIsLoading(true);
    postData("/api/category", formFields, { withCredentials: true }).then(
      (res) => {
        if (res?.success === true) {
          toast.success(res?.message);
          navigate("/category/list");
          setIsLoading(false);
          setFormFields({
            name: "",
            images: "",
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
          <div className="grid grid-cols-1 mb-3">
            <div className="col w-[25%]">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Category Name
              </h3>
              <input
                type="text"
                onChange={handleOnChangeInput}
                disabled={isLoading}
                name="name"
                placeholder="Category Name"
                value={formFields.name}
                className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
              />
            </div>
          </div>
          <br />
          <h3 className="text-[14px] text-black font-[500] mb-1">
            Category Image
          </h3>
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
              multiple={true}
              name={"images"}
              url={"/api/category/upload-images"}
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

export default AddNewCategory;
