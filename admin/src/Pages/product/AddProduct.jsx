import React, { useContext, useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Rating from "@mui/material/Rating";
import UploadProductBox from "../../Components/UploadProductBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdCloseCircle } from "react-icons/io";
import { Button } from "@mui/material";
import { MdOutlineFileUpload } from "react-icons/md";
import { MyContext } from "../../App";
import { BiLoader } from "react-icons/bi";
import toast from "react-hot-toast";
import { deleteImages, getData, postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function AddProduct() {
  const context = useContext(MyContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);
  const [bannerPreviews, setBannerPreviews] = useState([]);

  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    oldPrice: "",
    catName: "",
    category: "",
    catId: "",
    subCatName: "",
    subCatId: "",
    thirdSubCatName: "",
    thirdSubCatId: "",
    countInStock: "",
    rating: "",
    isFeatured: false,
    discount: "",
    productRam: [],
    size: [],
    weight: [],
    bannerDescription: "",
    bannerTitle: "",
    bannerImages: [],
    isDisplayOnHomeBanner: false
  });

  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdSubCat, setProductThirdSubCat] = useState("");
  const [isProductFeatured, setIsProductFeatured] = useState("");
  const [productRams, setProductRams] = useState([]);
  const [productWeight, setProductWeight] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [productRamsData, setProductRamsData] = useState([]);
  const [productSizesData, setProductSizesData] = useState([]);
  const [productWeightsData, setProductWeightsData] = useState([]);
  const [productRating, setProductRating] = useState(2);

  useEffect(() => {
    getProductWeights();
    getProductRams();
    getProductSizes();
  }, []);

  const getProductWeights = () => {
    getData("/api/product/weights").then((res) => {
      if (res?.success === true) {
        setProductWeightsData(res?.productWeights);
      }
    });
  };

  const getProductRams = () => {
    getData("/api/product/rams").then((res) => {
      if (res?.success === true) {
        setProductRamsData(res?.productRams);
        productRamsData;
      }
    });
  };

  const getProductSizes = () => {
    getData("/api/product/sizes").then((res) => {
      if (res?.success === true) {
        setProductSizesData(res?.productSizes);
        productSizesData;
      }
    });
  };

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
    formFields.catId = event.target.value;
    formFields.category = event.target.value;
  };

  const handleOnChangeSwitch = () => {
    setFormFields((prevState) => ({...prevState, isDisplayOnHomeBanner: !prevState.isDisplayOnHomeBanner}))
  };

  const selectCatByName = (catName) => {
    formFields.catName = catName;
  };

  const handleChangeProductSubCat = (event) => {
    setProductSubCat(event.target.value);
    formFields.subCatId = event.target.value;
  };

  const selectSubCatByName = (subCatName) => {
    formFields.subCatName = subCatName;
  };

  const handleChangeProductThirdSubCat = (event) => {
    setProductThirdSubCat(event.target.value);
    formFields.thirdSubCatId = event.target.value;
  };

  const selectThirdSubCatByName = (thirdSubCatName) => {
    formFields.thirdSubCatName = thirdSubCatName;
  };

  const handleChangeProductFeatured = (event) => {
    setIsProductFeatured(event.target.value);
    formFields.isFeatured = event.target.value;
  };

  const handleChangeProductRams = (event) => {
    const value = event.target.value;
    setProductRams(typeof value === String ? value.split(",") : value);
    formFields.productRam = event.target.value;
  };

  const handleChangeProductWeight = (event) => {
    const value = event.target.value;
    setProductWeight(typeof value === String ? value.split(",") : value);
    formFields.weight = event.target.value;
  };

  const handleChangeProductSize = (event) => {
    const value = event.target.value;
    setProductSize(typeof value === String ? value.split(",") : value);
    formFields.size = event.target.value;
  };

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

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

  const setBannerPreviewsfunction = (bannerPreviewsArr) => {
    const imgArr = bannerPreviews;
    for (let i = 0; i < bannerPreviewsArr?.length; i++) {
      imgArr.push(bannerPreviewsArr[i]);
    }
    setBannerPreviews([]);
    setTimeout(() => {
      setBannerPreviews(imgArr);
      formFields.bannerImages = imgArr;
    }, 100);
  };

  const handleOnChangeRating = (e) => {
    const { name, value } = e.target;
    setProductRating(value);
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRemoveImage = (img, index) => {
    deleteImages("/api/product/delete-image", img, {
      withCredentials: true,
    }).then((res) => {
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        setPreviews((prevState) => prevState.toSpliced(index, 1));
      }
    });
  };

  const handleRemoveBannerImage = (img, index) => {
    deleteImages("/api/product/delete-image", img, {
      withCredentials: true,
    }).then((res) => {
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        setBannerPreviews((prevState) => prevState.toSpliced(index, 1));
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formFields.name === "") {
      toast.error("Please enter product name!");
      return;
    } else if (formFields.description === "") {
      toast.error("Please enter product description!");
      return;
    } else if (formFields.catName === "") {
      toast.error("Please select product category!");
      return;
    } else if (formFields.price === "") {
      toast.error("Please enter product price!");
      return;
    } else if (formFields.oldPrice === "") {
      toast.error("Please enter product old price!");
      return;
    } else if (formFields.countInStock === "") {
      toast.error("Please enter product quantity in stock!");
      return;
    } else if (formFields.brand === "") {
      toast.error("Please enter product brand!");
      return;
    } else if (formFields.discount === "") {
      toast.error("Please enter product discount!");
      return;
    } else if (formFields.rating === "") {
      toast.error("Please enter product rating!");
      return;
    } else if (formFields.images.length === 0) {
      toast.error("Please add product images!");
      return;
    }
    console.log(formFields)
    setIsLoading(true);
    postData("/api/product/", formFields, { withCredentials: true }).then(
      (res) => {
        if (res?.success === true) {
          toast.success(res?.message);
          setIsLoading(false);
          setTimeout(() => {
            context.setIsOpenFullScreenPannel({ open: false, model: "" });
            navigate("/products");
          }, 1000);
        }
      }
    );
  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 scroll max-h-[78vh] px-2" onSubmit={handleSubmit}>
        <div className="px-6 overflow-y-scroll">
          <div className="grid grid-cols-1 mb-3">
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Name
              </h3>
              <input
                onChange={handleOnChangeInput}
                value={formFields.name}
                name="name"
                disabled={isLoading}
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
                onChange={handleOnChangeInput}
                disabled={isLoading}
                value={formFields.description}
                name="description"
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
                disabled={isLoading}
                size="small"
                className="w-full !p-1 !bg-white"
                label="Category"
                onChange={handleChangeProductCat}
              >
                {context?.categoryData?.length > 0 &&
                  context?.categoryData?.map((category) => {
                    return (
                      <MenuItem
                        onClick={() => selectCatByName(category?.name)}
                        key={category?._id}
                        value={category?._id}
                      >
                        {category?.name}
                      </MenuItem>
                    );
                  })}
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
                disabled={isLoading}
                size="small"
                className="w-full !p-1 !bg-white"
                label="Sub Category"
                onChange={handleChangeProductSubCat}
              >
                {context?.categoryData?.length > 0 &&
                  context?.categoryData?.map((category) => {
                    return (
                      category?.children?.length > 0 &&
                      category?.children?.map((subCat) => {
                        return (
                          <MenuItem
                            onClick={() => selectSubCatByName(subCat?.name)}
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
                Product Third Level Sub Category
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productThirdSubCatDropDown"
                value={productThirdSubCat}
                size="small"
                disabled={isLoading}
                className="w-full !p-1 !bg-white"
                label="Third Sub Category"
                onChange={handleChangeProductThirdSubCat}
              >
                {context?.categoryData?.length > 0 &&
                  context?.categoryData?.map((category) => {
                    return (
                      category?.children?.length > 0 &&
                      category?.children?.map((subCat) => {
                        return (
                          subCat?.children?.length > 0 &&
                          subCat?.children?.map((thirdSubCat) => {
                            return (
                              <MenuItem
                                onClick={() =>
                                  selectThirdSubCatByName(thirdSubCat?.name)
                                }
                                key={thirdSubCat?._id}
                                value={thirdSubCat?._id}
                              >
                                {thirdSubCat?.name}
                              </MenuItem>
                            );
                          })
                        );
                      })
                    );
                  })}
              </Select>
            </div>
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Price
              </h3>
              <input
                onChange={handleOnChangeInput}
                value={formFields.price}
                name="price"
                disabled={isLoading}
                type="number"
                className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
              />
            </div>
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Old Price
              </h3>
              <input
                onChange={handleOnChangeInput}
                value={formFields.oldPrice}
                name="oldPrice"
                disabled={isLoading}
                type="number"
                className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
              />
            </div>
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Is Featured?
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productisFeaturedDropDown"
                value={isProductFeatured}
                size="small"
                disabled={isLoading}
                className="w-full !p-1 !bg-white"
                label="isFeatured"
                onChange={handleChangeProductFeatured}
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </div>
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Stock
              </h3>
              <input
                onChange={handleOnChangeInput}
                value={formFields.countInStock}
                name="countInStock"
                disabled={isLoading}
                type="number"
                className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
              />
            </div>
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Brand
              </h3>
              <input
                onChange={handleOnChangeInput}
                value={formFields.brand}
                name="brand"
                disabled={isLoading}
                type="text"
                className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-3">
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Discount
              </h3>
              <input
                onChange={handleOnChangeInput}
                value={formFields.discount}
                name="discount"
                disabled={isLoading}
                type="number"
                className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
              />
            </div>
            {productRamsData?.length > 0 && (
              <div className="col">
                <h3 className="text-[14px] text-black font-[500] mb-1">
                  Product RAMS
                </h3>
                <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="productCatDropDown"
                  disabled={isLoading}
                  value={productRams}
                  size="small"
                  className="w-full !p-1 !bg-white"
                  label="Category"
                  onChange={handleChangeProductRams}
                >
                  {productRamsData?.map((item) => (
                    <MenuItem key={item?._id} value={item?.name}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            )}
            {productWeightsData?.length > 0 && (
              <div className="col">
                <h3 className="text-[14px] text-black font-[500] mb-1">
                  Product Weight
                </h3>
                <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="productCatDropDown"
                  value={productWeight}
                  disabled={isLoading}
                  size="small"
                  className="w-full !p-1 !bg-white"
                  label="Category"
                  onChange={handleChangeProductWeight}
                >
                  {productWeightsData?.map((item) => (
                    <MenuItem key={item?._id} value={item?.name}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            )}

            {productSizesData?.length > 0 && (
              <div className="col">
                <h3 className="text-[14px] text-black font-[500] mb-1">
                  Product Size
                </h3>
                <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="productCatDropDown"
                  value={productSize}
                  disabled={isLoading}
                  size="small"
                  className="w-full !p-1 !bg-white"
                  label="Category"
                  onChange={handleChangeProductSize}
                >
                  {productSizesData?.map((item) => (
                    <MenuItem key={item?._id} value={item?.name}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4 mb-3">
            <div className="col">
              <h3 className="text-[14px] text-black font-[500] mb-1">
                Product Stock
              </h3>
              <Rating
                name="rating"
                defaultValue={1}
                disabled={isLoading}
                value={Number(productRating)}
                onChange={handleOnChangeRating}
              />
            </div>
          </div>
          <div className="col w-full py-5">
            <h3 className="font-[600] text-[18px] mb-3">Media & Images</h3>
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
                url={"/api/product/upload-images"}
              />
            </div>
          </div>
        </div>
          <div className="flex px-6 py-3 rounded-md bg-white flex-col">
            <div className="grid grid-cols-1 mb-3">
              <div className="col">
                <h3 className="text-[14px] text-black font-[500] mb-1">
                  Banner Title
                </h3>
                <input
                  onChange={handleOnChangeInput}
                  value={formFields.bannerTitle}
                  name="bannerTitle"
                  disabled={isLoading}
                  type="text"
                  className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 mb-3">
              <div className="col">
                <h3 className="text-[14px] text-black font-[500] mb-1">
                  Banner Description
                </h3>
                <textarea
                  type="text"
                  onChange={handleOnChangeInput}
                  disabled={isLoading}
                  value={formFields.bannerDescription}
                  name="bannerDescription"
                  className="w-full h-[140px] p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
                />
              </div>
            </div>
            <div className="col w-full py-5">
              <div className="flex items-center gap-8">
              <h3 className="font-[600] text-[18px] mb-3">Banner Images</h3>
              <Switch {...label} checked={formFields.isDisplayOnHomeBanner}  onChange={handleOnChangeSwitch} />
              </div>
              <div className="grid grid-cols-7 gap-4">
                {bannerPreviews?.length > 0 &&
                  bannerPreviews.map((image, index) => {
                    return (
                      <div key={index} className="uploadBoxWrapper relative">
                        <IoMdCloseCircle
                          onClick={() => handleRemoveBannerImage(image, index)}
                          className="text-red-500 z-50 absolute -top-2 -right-2 cursor-pointer"
                          size={"30px"}
                        />
                        <div className="p-0 rounded-md h-[150px] flex-col w-[100%] flex items-center justify-center bg-gray-100 cursor-pointer hover:bg-gray-200 hover:border-gray-600 overflow-hidden border-dashed border border-gray-400">
                          <LazyLoadImage
                            alt={"banner image"}
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
                  setPreviewsfunction={setBannerPreviewsfunction}
                  multiple={true}
                  name={"bannerImages"}
                  url={"/api/product/uploadBannerImages"}
                />
              </div>
            </div>
          </div>
        <hr />
        <br />
        <Button
          disabled={isLoading}
          type="submit"
          className={`${
            isLoading ? "!bg-blue-500" : "!bg-blue-600"
          } mt-3 !text-white !capitalize !max-w-full !w-full !p-2 !text-center !font-[500] gap-1`}
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

export default AddProduct;
