import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import ProductList from "./pages/ProductListing/ProductList";
import Footer from "./pages/Home/Footer";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { createContext, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ProductZoom from "./components/ProductZoom";

import { IoMdClose } from "react-icons/io";
import ProductDetailsContent from "./components/ProductDetailsContent";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Cart from "./pages/Cart/Cart";
import Verify from "./pages/Auth/verify";

import toast, { Toaster } from "react-hot-toast";
import Checkout from "./pages/Checkout/Checkout";
import MyAccount from "./pages/My-Account/MyAccount";
import Wishlist from "./pages/Wishlist/Wishlist";
import Orders from "./pages/Order/Orders";
import { getData } from "./utils/api";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Address from "./pages/My-Account/Address";

const MyContext = createContext();

function App() {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);
  const [openCartPanel, setOpenCartPanel] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true);
      getData(
        `/api/user/user-details?token=${localStorage.getItem("accessToken")}`,
        { withCredentials: true }
      ).then((res) => {
        console.log(res);
        if (res?.success) {
          setUserData(res.data);
        } else {
          toast.error("Something went wrong!");
        }
      });
    } else {
      setIsLogin(false);
    }
  }, [isLogin]);

  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal(false);
  };

  const value = {
    setOpenProductDetailsModal,
    openCartPanel,
    setOpenCartPanel,
    isLogin,
    setIsLogin,
    userData,
    setUserData,
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={value}>
          <Header />
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/register"} element={<Register />} />
            <Route path={"/verify"} element={<Verify />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/forgot-password"} element={<ForgotPassword />} />
            <Route path={"/my-account"} element={<MyAccount />} />
            <Route path={"/productListing"} element={<ProductList />} />
            <Route path={"/productDetails/:id"} element={<ProductDetails />} />
            <Route path={"/checkout"} element={<Checkout />} />
            <Route path={"/cart"} element={<Cart />} />
            <Route path={"/wishlist"} element={<Wishlist />} />
            <Route path={"/orders"} element={<Orders />} />
            <Route path={"/address"} element={<Address />} />
          </Routes>
          <Footer />
        </MyContext.Provider>
      </BrowserRouter>

      <Toaster />
      <Dialog
        open={openProductDetailsModal}
        maxWidth={"lg"}
        onClose={handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="productDetailsModal"
        fullWidth={true}
      >
        <DialogContent>
          <div className="flex items-center gap-12 justify-between w-full relative">
            <Button
              className="!rounded-full !min-h-[35px] !h-[35px] !top-1 !absolute !right-1 z-50 cursor-pointer !flex !items-center !justify-center !min-w-[35px] !w-[35px] !text-gray-500"
              onClick={handleCloseProductDetailsModal}
            >
              <IoMdClose size={"22px"} />
            </Button>
            <div className="col-1 w-[40%]">
              <ProductZoom />
            </div>
            <div className="col-2 w-[60%] flex-1">
              <ProductDetailsContent />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
export { MyContext };
