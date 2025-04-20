import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export const addAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      address_line1,
      city,
      state,
      pincode,
      country,
      selected,
      mobile,
      status,
      landmark,
      addressType
    } = req.body;

    if (
      !address_line1 ||
      !city ||
      !state ||
      !pincode ||
      !country ||
      !landmark ||
      (!selected && selected !== false) ||
      !mobile ||
      (!status && status !== false)
    ) {
      return res.status(400).json({
        message: "Provide all the required fields",
        error: true,
        success: false,
      });
    }

    const address = new AddressModel({
      address_line1,
      city,
      state,
      pincode,
      country,
      mobile,
      status,
      userId,
      landmark,
      addressType,
      selected,
    });
    const savedAddress = await address.save();
    const updateAddressUser = await UserModel.updateOne(
      { _id: userId },
      {
        $push: {
          address_details: savedAddress?._id,
        },
      }
    );

    return res.status(200).json({
      message: "Address added successfully!",
      error: false,
      success: true,
      data: savedAddress,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const selectAddress = async (req, res) => {
  try {
    const userId = req.userId;

    const updateAddress = await AddressModel.findOne({
      _id: req.params.id,
      userId,
    });

    const addresses = await AddressModel.find({ userId });

    addresses.forEach((el) => {
      el.selected = false;
      el.save();
    });

    updateAddress.selected = true;
    const updatedAddress = await updateAddress.save();

    return res.status(200).json({
      message: "Address selected successfully!",
      error: false,
      success: true,
      updatedAddress,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const _id = req?.params?.id;

    if (!_id) {
      return res.status(400).json({
        message: "Provide _id!",
        error: true,
        success: false,
      });
    }

    const deleteAddress = await AddressModel.deleteOne({ _id, userId });
    if (!deleteAddress) {
      return res.status(404).json({
        message: "Address is not found!",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ _id: userId });
    const userAddress = user?.address_details;

    const deletedUserAddress = userAddress.splice(
      userAddress.indexOf(_id),
      1
    );

    await user.save();

    return res.status(200).json({
      message: "Address deleted successfully!",
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
