import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmailFun from "../config/sendEmail.js";
import verifyEmailTemplate from "../utils/verifyEmailTemplate.js";

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

    const verifyOTP = Math.floor((Math.random() + 100000) * 900000).toString();

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

    const token = jwt.sign({email: user.email, id: user._id}, process.env.JSON_WEB_TOKEN_SECRET_KEY)
    
    return res.status(200).json({
      success: true,
      error: false,
      message: 'User registered successfully! Please verify your email.',
      token
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
