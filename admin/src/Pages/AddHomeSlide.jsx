import React, { useContext, useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import UploadProductBox from "../Components/UploadProductBox";
import { Button } from "@mui/material";
import { MdOutlineFileUpload } from "react-icons/md";
import { deleteImages, postData } from "../utils/api";
import { BiLoader } from "react-icons/bi";
import toast from "react-hot-toast";
import { MyContext } from "../App";
import { useNavigate } from "react-router-dom";

function AddHomeSlide() {
  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    images: ''
  })


  useEffect(() => {
      setFormFields({images: previews });
  }, [previews]);

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const handleRemoveImage = (img, index) => {
    deleteImages("/api/homeSlides/deleteImage", img, {
      withCredentials: true,
    }).then((res) => {
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        setPreviews((prevState) => prevState.toSpliced(index, 1));
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (previews?.length === 0) {
      toast.error("Please add images!");
      return;
    }
    setIsLoading(true);
    postData("/api/homeSlides", formFields, { withCredentials: true }).then(
      (res) => {
        if (res?.success === true) {
          toast.success(res?.message);
          setIsLoading(false);
          setPreviews([])
          navigate('/homeSlider/list')
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
              setPreviews={setPreviews}
              multiple={false}
              name={"images"}
              url={"/api/category/upload-images"}
            />
          </div>
        </div>
        <br />

        <Button
          disabled={previews?.length === 0 || isLoading}
          type="submit"
          className={`${
            previews?.length === 0 || isLoading
              ? "!bg-blue-500"
              : "!bg-blue-600"
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

export default AddHomeSlide;
