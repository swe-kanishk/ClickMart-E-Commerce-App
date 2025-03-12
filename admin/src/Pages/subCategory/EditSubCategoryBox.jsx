import { Button, MenuItem, Select } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import { MyContext } from "../../App";
import { deleteData, editData } from "../../utils/api";
import toast from "react-hot-toast";
import { BiLoader } from "react-icons/bi";

function EditSubCategoryBox({
  name,
  selectedCatName,
  id,
  selectedCat,
  categoryData,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(selectedCatName);
  const [editMode, setEditMode] = useState(false);

  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });

  const context = useContext(MyContext);

  useEffect(() => {
    setFormFields({
      name: name,
      parentCatName: selectedCatName,
      parentId: selectedCat,
    });
    setSelectedValue(selectedCat);
  }, []);

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setFormFields((prevState) => ({
      ...prevState,
      parentId: event.target.value,
    }));
  };

  const validValue = Object.values(formFields).every((el) => el);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formFields.name === "") {
      toast.error("Please enter sub category name!");
      return;
    } else if (formFields.parentCatName === "") {
      toast.error("Please select parent category!");
      return;
    }
    setIsLoading(true);
    editData(`/api/category/${id}`, formFields, { withCredentials: true }).then(
      (res) => {
        if (res?.data?.success === true) {
          toast.success(res?.data?.message);
          setIsLoading(false);
          setFormFields({
            name: "",
            parentCatName: null,
            parentId: null
          });
          context.getCat();
        }
      }
    );
  };

  const handleDeleteCat = () => {
    deleteData(`/api/category/${id}`).then((res) => {
      console.log(res);
      if (res?.data?.success === true) {
        toast.success(res?.data?.message);
        context?.getCat()
      }
    });
  };
  return (
    <form
      className="w-full flex items-center gap-3 px-4"
      onSubmit={handleSubmit}
    >
      {editMode === true && (
        <div className="flex items-center justify-between py-2 gap-4">
          <div className="w-[150px]">
            <Select
              value={selectedValue}
              disabled={isLoading}
              size="small"
              className="w-full !p-1 !bg-white"
              label="subCategory"
              onChange={handleChange}
            >
              {categoryData?.length > 0 &&
                categoryData.map((cat) => {
                  return (
                    <MenuItem
                      onClick={() => setSelectedValue(cat?.name)}
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
          <input
            type="text"
            onChange={handleOnChangeInput}
            name="name"
            value={formFields.name}
            disabled={isLoading}
            className="w-full  p-3 text-sm border rounded-md border-gray-300 outline-none focus:border-gray-800"
          />
          <Button
            disabled={!validValue || isLoading}
            type="submit"
            className={`${
              !validValue || isLoading ? "!bg-blue-400" : "!bg-blue-600"
            } !text-white !capitalize !max-w-[250px] !w-fit !text-center !font-[500] gap-1`}
          >
            {isLoading ? (
              <BiLoader size={"22px"} className="animate-spin" />
            ) : (
              "Save"
            )}
          </Button>

          <Button
          onClick={() => setEditMode(false)}
            className={`!bg-gray-100 mt-3 !text-black !capitalize !max-w-[250px] !w-fit !p-2 !text-center !font-[500] gap-1`}
          >
            Cancel
          </Button>
        </div>
      )}
      {editMode === false && (
        <>
          <span className="font-[500] text-[14px]">{name}</span>
          <div className="flex items-center ml-auto gap-2">
            <Button
              onClick={() => setEditMode(true)}
              className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-gray-600"
            >
              <AiOutlineEdit size={24} />
            </Button>
            <Button onClick={handleDeleteCat} className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-gray-600">
              <GoTrash size={16} />
            </Button>
          </div>
        </>
      )}
    </form>
  );
}

export default EditSubCategoryBox;
