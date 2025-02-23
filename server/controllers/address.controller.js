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
    } = req.body;
    if (
      !address_line1 ||
      !city ||
      !state ||
      !pincode ||
      !country ||
      !selected ||
      !mobile ||
      !status
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
