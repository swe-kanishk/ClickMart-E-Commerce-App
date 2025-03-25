import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import sendEmailFun from "../config/sendEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import ReviewModel from "../models/review.model.js";

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import ProductModel from "../models/product.model.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CONFIG_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CONFIG_API_KEY,
  api_secret: process.env.CLOUDINARY_CONFIG_API_SECRET,
  secure: true,
});

export const registerUserController = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    console.log(fullName, email, password);
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: `provide email, fullName, password`,
        error: true,
        success: false,
      });
    }
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.json({
        message: "User already Registered with this email!",
        error: true,
        success: false,
      });
    }

    const verifyOTP = Math.floor(100000 + Math.random() * 900000).toString();

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user = new UserModel({
      email,
      password,
      fullName,
      password: hashPassword,
      otp: verifyOTP,
      otpExpires: Date.now() + 600000, // 10 minutes
    });
    await user.save();

    await sendEmailFun({
      to: email,
      subject: "verify email from ClickMart App",
      text: "",
      html: verifyEmailTemplate({ fullName, otp: verifyOTP }),
    });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JSON_WEB_TOKEN_SECRET_KEY
    );

    return res.status(200).json({
      success: true,
      error: false,
      message: "User registered successfully! Please verify your email.",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const verifyEmailController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found!",
        error: true,
        success: false,
      });
    }

    const isOtpValid = user.otp === otp;
    const isOtpNotExpired = user.otpExpires > Date.now();

    if (isOtpValid && isOtpNotExpired) {
      user.verify_email = true;
      user.otp = null;
      user.otpExpires = null;
      await user.save();
      return res.status(200).json({
        success: true,
        error: false,
        message: "Email verified successfully!",
      });
    } else if (!isOtpValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP!",
      });
    } else
      return res.status(400).json({
        success: false,
        error: true,
        message: "OTP Expired!",
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: `provide email, password`,
        error: true,
        success: false,
      });
    }
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User doesn't exist with this email!",
        error: true,
        success: false,
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        message: "Contact to admin!",
        error: true,
        success: false,
      });
    }

    if (user.verify_email !== true) {
      return res.status(400).json({
        message:
          "Your email is not verified yet, Please verify your email first!",
        error: true,
        success: false,
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.json({
        message: "Incorrect password!",
        error: true,
        success: false,
      });
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    res.cookie("accessToken", accessToken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.json({
      message: "Login Successfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    const userId = req.userId; // coming from middleware
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("accessToken", cookiesOption);
    res.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
      refresh_token: "",
    });
    return res.json({
      message: "Logout successfully!",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const authWithGoogle = async (req, res) => {
  try {
    const { fullName, email, mobile, avatar, role } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({
        message: `provide email, fullName`,
        error: true,
        success: false,
      });
    }
    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.create({
        fullName,
        email,
        avatar,
        mobile,
        role,
        signUpWithGoogle: true,
        verify_email: true,
        password: "null",
      });
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    res.cookie("accessToken", accessToken, cookiesOption);
    res.cookie("refreshToken", refreshToken, cookiesOption);

    return res.json({
      message: "Login Successfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

var imagesArr = [];
export const userAvatarController = async (req, res) => {
  try {
    imagesArr = [];
    const userId = req.userId;
    const images = req.files;

    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(500).json({
        message: "User not found!",
        error: true,
        success: false,
      });
    }

    if (user.avatar) {
      try {
        const avatarUrl = user.avatar;
        const urlParts = avatarUrl.split("/");
        const fileNameWithExt = urlParts[urlParts.length - 1];
        const publicId = fileNameWithExt.substring(
          0,
          fileNameWithExt.lastIndexOf(".")
        );

        await cloudinary.uploader.destroy(publicId);
      } catch (deleteError) {
        console.error("Error deleting old avatar:", deleteError);
      }
    }

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (let i = 0; i < images?.length; i++) {
      const img = await cloudinary.uploader
        .upload(images[i].path, options, (err, result) => {
          imagesArr.push(result.secure_url);
          fs.unlinkSync(`uploads/${images[i].filename}`);
          console.log(images[i].filename);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    user.avatar = imagesArr[0];
    await user.save();

    return res.status(200).json({
      _id: userId,
      avatar: imagesArr[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const removeImageFromCloudinary = async (req, res) => {
  try {
    const imgUrl = req.query.img;
    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1];
    const imageName = image.split(".")[0];

    if (imageName) {
      const cloudinaryRes = await cloudinary.uploader.destroy(
        imageName,
        (err, result) => {
          // console.log(err, res)
        }
      );
      if (cloudinaryRes) res.status(200).send(cloudinaryRes);
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const { fullName, email, mobile, password } = req.body;
    const userExist = await UserModel.findById(userId);
    if (!userExist) return res.status(400).send("User cannot be updated!");

    let verifyOTP = "";
    if (email !== userExist.email) {
      verifyOTP = Math.floor(100000 + Math.random() * 900000).toString();
    }

    let hashPassword = "";
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(password, salt);
    } else {
      hashPassword = userExist.password;
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        fullName,

        mobile,
        email,
        verify_email: email !== userExist.email ? false : true,
        password: hashPassword,
        otp: verifyOTP !== "" ? verifyOTP : null,
        otpExpires: verifyOTP !== "" ? Date.now() + 600000 : "",
      },
      { new: true }
    );

    if (email !== userExist.email) {
      await sendEmailFun({
        to: email,
        subject: "verify email from ClickMart App",
        text: "",
        html: verifyEmailTemplate({ fullName, otp: verifyOTP }),
      });
    }

    return res.json({
      message: "User updated successfully!",
      error: false,
      success: true,
      user: {
        fullName: updateUser?.fullName,
        email: updateUser?.email,
        _id: updateUser?._id,
        mobile: updateUser?.mobile,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email is not available!",
        error: true,
        success: false,
      });
    }
    const verifyOTP = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = verifyOTP;
    user.otpExpires = Date.now() + 600000;
    await user.save();

    await sendEmailFun({
      to: email,
      subject: "verify OTP from ClickMart App",
      text: "",
      html: verifyEmailTemplate({ fullName: user.fullName, otp: verifyOTP }),
    });

    return res.json({
      message: "check your email!",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const verifyForgotPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if ((!email, !otp)) {
      return res.status(400).json({
        message: "Provide required field email, otp!",
        error: true,
        success: false,
      });
    }
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email is not available!",
        error: true,
        success: false,
      });
    }
    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP!",
        error: true,
        success: false,
      });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({
        message: "OTP Expired!",
        error: true,
        success: false,
      });
    }

    user.otp = "";
    user.otpExpires = null;
    await user.save();

    return res.json({
      message: "OTP verifed successfully!",
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

export const resetPasswordController = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;
    if ((!email, !newPassword, !confirmPassword)) {
      return res.status(400).json({
        message: "Provide required field email, newPassword, confirmPassword!",
        error: true,
        success: false,
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "newPassword and confirmPassword must be same!",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email is not available!",
        error: true,
        success: false,
      });
    }

    if (user.signUpWithGoogle === false) {
      const isPasswordMatched = await bcrypt.compare(
        oldPassword,
        user.password
      );
      if (!isPasswordMatched) {
        return res.json({
          message: "Incorrect old password!",
          error: true,
          success: false,
        });
      }
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.signUpWithGoogle = false;
    await user.save();

    return res.json({
      message: "Password updated successfully!",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const refreshTokenController = async (req, res) => {
  try {
    const refreshToken =
      req?.cookies?.refreshToken || req?.headers?.authorization.split(" ")[1];
    if (!refreshToken) {
      return res.status(401).json({
        message: "Invalid token!",
        error: true,
        success: false,
      });
    }

    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );
    if (!verifyToken) {
      return res.status(401).json({
        message: "Token Expired!",
        error: true,
        success: false,
      });
    }
    const userId = verifyToken._id;
    const newAccessToken = await generateAccessToken(userId);
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };
    res.cookie("accessToken", newAccessToken, cookiesOption);

    return res.json({
      message: "New access token generated!",
      error: false,
      success: true,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId)
      .populate("address_details")
      .select("-password -refresh_token");
    return res.json({
      message: "user details!",
      data: user,
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

// review
export const addReview = async (req, res) => {
  try {
    const { rating, title, review, productId } = req.body;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(400).json({
        message: "Product not found!",
        error: true,
        success: false,
      });
    }
    if (!rating || !title || !review || !productId) {
      return res.status(400).json({
        message: "Provide required field rating, title, review, productId!",
        error: true,
        success: false,
      });
    }
    const reviewData = await ReviewModel.create({
      rating,
      title,
      review,
      user: req?.userId,
      product: productId,
    });
    await ProductModel
      .findByIdAndUpdate(productId, {
        $push: { reviews: reviewData._id }
      }).exec();
    return res.json({
      message: "Review Added!",
      reviewData,
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
