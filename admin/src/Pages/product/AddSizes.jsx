import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BiLoader } from "react-icons/bi";
import { MdOutlineFileUpload } from "react-icons/md";
import TooltipMui from "@mui/material/Tooltip";
import { GoTrash } from "react-icons/go";
import { AiOutlineEdit } from "react-icons/ai";
import { deleteData, editData, getData, postData } from "../../utils/api";
import toast from "react-hot-toast";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function AddSizes() {
  const [isLoading, setIsLoading] = useState(false);
  const [newProductSize, setNewProductSize] = useState("");
  const [productSizesData, setProductSizesData] = useState([]);
  const [editSize, setEditSize] = useState(null);

  const getProductSizes = () => {
    getData("/api/product/sizes").then((res) => {
      if (res?.success === true) {
        setProductSizesData(res?.productSizes);
        productSizesData;
      }
    });
  };

  useEffect(() => {
    getProductSizes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!newProductSize) {
      toast.error("Please Enter Product Size");
      return;
    }

    if (editSize) {
      editData(
        `/api/product/sizes/${editSize?._id}`,
        { name: newProductSize },
        { withCredentials: true }
      )
        .then((res) => {
          console.log(res);
          if (res?.data?.success === true) {
            toast.success(res?.data?.message);
            const updatedProductSizesData = productSizesData.map((item) =>
              item?._id === editSize?._id ? res?.data?.productSize : item
            );
            setProductSizesData(updatedProductSizesData);
            setNewProductSize("");
            setEditSize(null);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      postData("/api/product/size", { name: newProductSize })
        .then((res) => {
          if (res.success === true) {
            toast?.success(res?.message);
            setNewProductSize("");
            setProductSizesData((prevState) => [...prevState, res?.productSize]);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    setNewProductSize(editSize?.name);
  }, [editSize]);

  const handleDelete = (id) => {
    deleteData(`/api/product/sizes/${id}`, { withCredentials: true }).then(
      (res) => {
        if (res?.data?.success === true) {
          toast.success(res?.data?.message);
          const newProductSizesData = productSizesData.filter(
            (item) => item?._id !== id
          );
          setProductSizesData(newProductSizesData);
        }
      }
    );
  };
  return (
    <>
      <div className="flex items-center px-2 py-0 mt-3 justify-between">
        <h2 className="text-[20px] font-[600]">Add Product Size</h2>
      </div>
      <div className="flex items-start gap-8">
        <div className="card bg-white w-[60%] overflow-hidden shadow-md sm:rounded-lg rounded-md border my-4 border-gray-200 hover:border-gray-400 transition-all">
          <form className="form py-3 px-4" onSubmit={handleSubmit}>
            <div className="col mb-4">
              <h3 className="text-[14px] text-black font-[500] mb-2">
                Product Size
              </h3>
              <input
                onChange={(e) => setNewProductSize(e.target.value)}
                value={newProductSize}
                name="name"
                disabled={isLoading}
                type="text"
                className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
              />
            </div>
            {editSize ? (
              <div className="flex items-center gap-8">
                <Button
                  disabled={isLoading || !newProductSize}
                  type="submit"
                  className={`${
                    isLoading || !newProductSize
                      ? "!bg-blue-500"
                      : "!bg-blue-600"
                  } mt-3 !text-white !capitalize !max-w-full !w-1/2 !p-2 !text-center !font-[500] gap-1`}
                >
                  {isLoading ? (
                    <BiLoader size={"22px"} className="animate-spin" />
                  ) : (
                    <>
                      <MdOutlineFileUpload size={"20px"} className="mb-1" />{" "}
                      Update and View
                    </>
                  )}
                </Button>
                <Button
                  disabled={!editSize}
                  onClick={() => {
                    setEditSize(null);
                    setNewProductSize("");
                  }}
                  type="submit"
                  className={`${
                    isLoading || !newProductSize
                      ? "!bg-gray-200"
                      : "!bg-gray-100"
                  } mt-3 !text-gray-700 !capitalize !max-w-full !w-1/2 !p-2 !text-center !font-[500] gap-1`}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                disabled={isLoading || !newProductSize}
                type="submit"
                className={`${
                  isLoading || !newProductSize ? "!bg-blue-500" : "!bg-blue-600"
                } mt-3 !text-white !capitalize !max-w-full !w-full !p-2 !text-center !font-[500] gap-1`}
              >
                {isLoading ? (
                  <BiLoader size={"22px"} className="animate-spin" />
                ) : (
                  <>
                    <MdOutlineFileUpload size={"20px"} className="mb-1" />{" "}
                    Publish and View
                  </>
                )}
              </Button>
            )}
          </form>
        </div>
        <div className="card bg-white w-[40%] overflow-hidden shadow-md sm:rounded-lg rounded-md border my-4 border-gray-200 hover:border-gray-400 transition-all">
          <div className="relative w-full overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-600 uppercase bg-gray-100  ">
                <tr>
                  <th
                    scope="col"
                    className="px-6 w-[10%] whitespace-nowrap py-3"
                  >
                    <Checkbox {...label} size="small" />
                  </th>
                  <th
                    scope="col"
                    className="px-6 w-[60%] whitespace-nowrap py-3"
                  >
                    Product Sizes
                  </th>
                  <th
                    scope="col"
                    className="px-6 w-[30%] whitespace-nowrap py-3"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {productSizesData?.length > 0 &&
                  productSizesData?.map((item) => {
                    return (
                      <tr key={item?._id} className="bg-white border-b">
                        <td className="px-6 py-4">
                          <Checkbox {...label} size="small" />
                        </td>
                        <td className="px-6 py-4">{item?.name}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-start">
                            <TooltipMui
                              title="Edit Product Size"
                              placement="top"
                            >
                              <Button onClick={() => setEditSize(item)}>
                                <AiOutlineEdit
                                  size={"22px"}
                                  className="text-gray-400"
                                />
                              </Button>
                            </TooltipMui>
                            <TooltipMui
                              title="Remove Product Size"
                              placement="top"
                            >
                              <Button
                                onClick={() => handleDelete(item?._id)}
                                className="!w-[35px] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px] !h-[35px] !text-gray-500"
                              >
                                <GoTrash size={"16px"} />
                              </Button>
                            </TooltipMui>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddSizes;
