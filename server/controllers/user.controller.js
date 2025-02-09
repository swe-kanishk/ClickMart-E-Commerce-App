import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import sendEmailFun from "../config/sendEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";

export const registerUserController = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: `provide email, firstName, lastName, password`,
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
      firstName,
      lastName,
      password: hashPassword,
      otp: verifyOTP,
      otpExpires: Date.now() + 600000, // 10 minutes
    });
    await user.save();

    await sendEmailFun({
      to: email,
      subject: "verify email from ClickMart App",
      text: "",
      html: verifyEmailTemplate({ firstName, lastName, otp: verifyOTP }),
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

    if (user.status !== 'Active') {
      return res.status(400).json({
        message: "Contact to admin!",
        error: true,
        success: false,
      });
    }

    const isPasswordMatched = bcrypt.compare(password, user.password);
    if(!isPasswordMatched) {
      return res.json({
        message: "Incorrect password!",
        error: true,
        success: false,
      });
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    await UserModel.findByIdAndUpdate(user?._id, {last_login_date: new Date()});

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    }

    res.cookie('accessToken', accessToken, cookiesOption);
    res.cookie('refreshToken', refreshToken, cookiesOption);

    return res.json({
      message: "Login Successfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken
      }
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const logoutController = async(req, res) => {
  try {
    const userId = req.userId // coming from middleware
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    }
    res.clearCookie('accessToken', cookiesOption);
    res.clearCookie('refreshToken', cookiesOption);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {refresh_token: ''});
    return res.json({
      message: 'Logout successfully!',
      error: false,
      success: true
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}