import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import UploadProductBox from "../../Components/UploadProductBox";
import { Button } from "@mui/material";
import { MdOutlineFileUpload } from "react-icons/md";
import { useState } from "react";
import { deleteImages, editData, getData } from "../../utils/api";
import toast from "react-hot-toast";
import { BiLoader } from "react-icons/bi";
import { useEffect } from "react";
import { useContext } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Editor from "react-simple-wysiwyg";

function EditBlog() {
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const context = useContext(MyContext);
  const [formFields, setFormFields] = useState({
    title: "",
    content: "",
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

  const getBlog = () => {
    getData(`/api/blogs/${context?.isOpenFullScreenPannel?.id}`).then((res) => {
      if (res?.success === true) {
        setFormFields({
          title: res?.blog?.title,
          content: res?.blog?.content,
          images: res?.blog?.images,
        });
        setPreviews(res?.blog?.images);
      }
    });
  };

  useEffect(() => {
    getBlog();
  }, []);

  const handleRemoveImage = (img, index) => {
    deleteImages("/api/blogs/deleteImage", img, {
      withCredentials: true,
    }).then((res) => {
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        setPreviews((prevState) => {
          const updatedPreviews = prevState.toSpliced(index, 1);
          setFormFields((prevFormFields) => ({
            ...prevFormFields,
            images: updatedPreviews, // Update formFields.images as well
          }));
          return updatedPreviews;
        });
      }
    });
  };

  const validValue = Object.values(formFields).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formFields.title === "") {
      toast.error("Please enter blog title!");
      return;
    } else if (formFields.images.length === 0) {
      toast.error("Please add images!");
      return;
    } else if (formFields.content === "") {
      toast.error("Please add blog content!");
      return;
    }
    setIsLoading(true);
    editData(`/api/blogs/${context?.isOpenFullScreenPannel?.id}`, formFields, {
      withCredentials: true,
    }).then((res) => {
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        navigate("/blogs");
        setIsLoading(false);
        setFormFields({
          title: "",
          content: "",
          images: [],
        });
        setPreviews([]);
        setTimeout(() => {
          context.setIsOpenFullScreenPannel({
            open: false,
            model: "",
            id: "",
          });
        }, 1000);
      }
    });
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form px-2" onSubmit={handleSubmit}>
        <div className="scroll max-h-[90vh] pt-4 overflow-y-scroll">
          <div className="grid grid-cols-1 mb-3">
            <div className="col w-full">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Blog title
              </h3>
              <input
                type="text"
                onChange={handleOnChangeInput}
                disabled={isLoading}
                name="title"
                placeholder="title"
                value={formFields?.title}
                className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 mb-3">
            <div className="col w-full">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Blog Content
              </h3>
              <Editor
                value={formFields.content}
                disabled={isLoading}
                containerProps={{ style: { resize: "vertical" } }}
                name="content"
                onChange={handleOnChangeInput}
              />
            </div>
          </div>
          <br />
          <h3 className="text-[14px] text-black font-[500] mb-1">Blog Image</h3>
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
              url={"/api/blogs/uploadImages"}
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

export default EditBlog;
