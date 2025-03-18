import { Router } from "express";
import { authWithGoogle, forgotPasswordController, getUserDetails, loginUserController, logoutController, refreshTokenController, registerUserController, removeImageFromCloudinary, resetPasswordController, updateUserDetails, userAvatarController, verifyEmailController, verifyForgotPasswordOtp } from "../controllers/user.controller.js";
import auth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const userRouter = Router();

userRouter.post('/register', registerUserController);
userRouter.post('/verify-email', verifyEmailController);
userRouter.post('/login', loginUserController);
userRouter.post('/authWithGoogle', authWithGoogle);
userRouter.get('/logout', auth, logoutController);
userRouter.put('/user-avatar', auth, upload.array('avatar'), userAvatarController);
userRouter.delete('/delete-image', auth, removeImageFromCloudinary);
userRouter.put('/:id', auth, updateUserDetails);
userRouter.post('/forgot-password', forgotPasswordController);
userRouter.post('/verify-forgot-password-otp', verifyForgotPasswordOtp);
userRouter.post('/reset-password', resetPasswordController);
userRouter.post('/refresh-token', refreshTokenController);
userRouter.get('/user-details', auth, getUserDetails);

export default userRouter;