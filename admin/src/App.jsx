import "./App.css";
import "./responsive.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import React, { createContext, useEffect, useState } from "react";
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";

import toast, { Toaster } from "react-hot-toast";

import HomeSliderBanners from "./Pages/HomeSliderBanners";
import CategoryList from "./Pages/category/CategoryList";
import Users from "./Pages/Users";
import Orders from "./Pages/Orders";
import ForgotPassword from "./Pages/auth/ForgotPassword";
import VerifyAccount from "./Pages/auth/VerifyAccount";
import ChangePassword from "./Pages/auth/ChangePassword";
import { getData } from "./utils/api";
import Profile from "./Pages/Profile";
import SubCategoryList from "./Pages/subCategory/SubCategoryList";
import Products from "./Pages/product/Products";
import ProductDetails from "./Pages/product/ProductDetails";
import AddRAMS from "./Pages/product/AddRAMS";
import AddSizes from "./Pages/product/AddSizes";
import AddWeight from "./Pages/product/AddWeight";
import BlogList from "./Pages/Blog/BlogList";
import BannerV1List from "./Pages/banners/BannerV1List";
import AdsBannerList from "./Pages/banners/adsBannerList";
import MainLayout from "./MainLayout";

const MyContext = createContext();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebarWidth, setSidebarWidth] = useState(18);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("accessToken");

    // Simplified token check
    if (!token) {
      setIsLogin(false);
      return; // No need to remove token if it doesn't exist
    }

    try {
      const res = await getData(`/api/user/user-details?token=${token}`, {
        withCredentials: true,
      });
      console.log(res);

      if (res?.success === true) {
        setAdminData(res.data);
        setIsLogin(true); // Set only after successful response
      } else {
        localStorage.removeItem("accessToken");
        setIsLogin(false);
        toast.error(
          res.message || "Authentication failed. Please log in again."
        );
      }
    } catch (error) {
      localStorage.removeItem("accessToken");
      setIsLogin(false);

      // Handle specific backend responses
      if (error.expired) {
        toast.error("Your session has expired. Please log in again.");
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Unable to connect to the server. Please try again later.");
      }
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [isLogin]);

  const getCat = () => {
    getData("/api/category").then((res) => {
      if (res?.success === true) {
        setCategoryData(res?.data);
      }
    });
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    getCat();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth < 992) {
      setIsSidebarOpen(false);
      setSidebarWidth(100);
    } else {
      setSidebarWidth(18);
    }
  }, [windowWidth]);

  const [isOpenFullScreenPannel, setIsOpenFullScreenPannel] = useState({
    open: false,
    model: "",
    id: "",
  });

  const handleCloseFullScreenPannel = () => {
    setIsOpenFullScreenPannel({ open: false, model: "" });
  };

  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <MainLayout>
          <Dashboard />
        </MainLayout>
      ),
    },
    {
      path: "/login",
      exact: true,
      element: <Login />,
    },
    {
      path: "/forgot-password",
      exact: true,
      element: <ForgotPassword />,
    },
    {
      path: "/verify-account",
      exact: true,
      element: <VerifyAccount />,
    },
    {
      path: "/change-password",
      exact: true,
      element: <ChangePassword />,
    },
    {
      path: "/sign-up",
      exact: true,
      element: <Signup />,
    },
    {
      path: "/products",
      exact: true,
      element: (
        <MainLayout>
          <Products />
        </MainLayout>
      ),
    },
    {
      path: "/category/list",
      exact: true,
      element: (
        <MainLayout>
          <CategoryList />
        </MainLayout>
      ),
    },
    {
      path: "/homeSlider/list",
      exact: true,
      element: (
        <MainLayout>
          <HomeSliderBanners />
        </MainLayout>
      ),
    },
    {
      path: "/blogs",
      exact: true,
      element: (
        <MainLayout>
          <BlogList />
        </MainLayout>
      ),
    },
    {
      path: "/subCategory/list",
      exact: true,
      element: (
        <MainLayout>
          <SubCategoryList />
        </MainLayout>
      ),
    },
    {
      path: "/users",
      exact: true,
      element: (
        <MainLayout>
          <Users />
        </MainLayout>
      ),
    },
    {
      path: "/profile",
      exact: true,
      element: (
        <MainLayout>
          <Profile />
        </MainLayout>
      ),
    },
    {
      path: "/product/:id",
      exact: true,
      element: (
        <MainLayout>
          <ProductDetails />
        </MainLayout>
      ),
    },
    {
      path: "/orders",
      exact: true,
      element: (
        <MainLayout>
          <Orders />
        </MainLayout>
      ),
    },
    {
      path: "/product/addRams",
      exact: true,
      element: (
        <MainLayout>
          <AddRAMS />
        </MainLayout>
      ),
    },
    {
      path: "/product/addSizes",
      exact: true,
      element: (
        <MainLayout>
          <AddSizes />
        </MainLayout>
      ),
    },
    {
      path: "/product/addWeight",
      exact: true,
      element: (
        <MainLayout>
          <AddWeight />
        </MainLayout>
      ),
    },
    {
      path: "/bannerV1/list",
      exact: true,
      element: (
        <MainLayout>
          <BannerV1List />
        </MainLayout>
      ),
    },
    {
      path: "/adsBanner/list",
      exact: true,
      element: (
        <MainLayout>
          <AdsBannerList />
        </MainLayout>
      ),
    },
  ]);

  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin,
    adminData,
    setAdminData,
    isOpenFullScreenPannel,
    setIsOpenFullScreenPannel,
    categoryData,
    setCategoryData,
    getCat,
    handleCloseFullScreenPannel,
    windowWidth,
    setSidebarWidth,
    sidebarWidth,
  };

  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />
        <Toaster />
      </MyContext.Provider>
    </>
  );
}

export default App;
export { MyContext };
