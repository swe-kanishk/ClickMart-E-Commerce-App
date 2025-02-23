import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import React, { createContext, useEffect, useState } from "react";
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import Products from "./Pages/Products";

import Dialog from '@mui/material/Dialog';
import toast, { Toaster } from "react-hot-toast";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { IoMdClose } from "react-icons/io";
import AddProduct from "./Pages/AddProduct";
import HomeSliderBanners from "./Pages/HomeSliderBanners";
import AddHomeSlide from "./Pages/AddHomeSlide";
import AddNewCategory from "./Pages/AddNewCategory";
import CategoryList from "./Pages/CategoryList";
import SubCategoryList from "./Pages/SubCategoryList";
import AddNewSubCategory from "./Pages/AddNewSubCategory";
import Users from "./Pages/Users";
import Orders from "./Pages/Orders";
import ForgotPassword from "./Pages/auth/ForgotPassword";
import VerifyAccount from "./Pages/auth/VerifyAccount";
import ChangePassword from "./Pages/auth/ChangePassword";
import { getData } from "./utils/api";
import Profile from "./Pages/Profile";
import AddNewAddress from "./Pages/AddNewAddress";

const MyContext = createContext()

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false)
  const [adminData, setAdminData] = useState(null)

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("accessToken");

    // Simplified token check
    if (!token) {
      setIsLogin(false);
      return; // No need to remove token if it doesn't exist
    }

    try {
      const res = await getData(
        `/api/user/user-details?token=${token}`,
        { withCredentials: true }
      );
      console.log(res);

      if (res?.success === true) {
        setAdminData(res.data);
        setIsLogin(true); // Set only after successful response
      } else {
        localStorage.removeItem("accessToken");
        setIsLogin(false);
        toast.error(res.message || "Authentication failed. Please log in again.");
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

  const [isOpenFullScreenPannel, setIsOpenFullScreenPannel] = useState({
    open: false,
    model: ''
  })

  const handleCloseFullScreenPannel = () => {
    setIsOpenFullScreenPannel({open: false, model: ''})
  }

  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: (
        <section className="main">
          <Header />
          <div className="mainContent flex">
          <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
              <Sidebar />
            </div>
            <div className={`right-content p-5 ${isSidebarOpen ? 'w-[82%]' : 'w-[100%]'} transition-all`}>
              <Dashboard />
            </div>
          </div>
        </section>
      ),
    },
    {
      path: "/login",
      exact: true,
      element: <Login />
    },
    {
      path: "/forgot-password",
      exact: true,
      element: <ForgotPassword />
    },
    {
      path: "/verify-account",
      exact: true,
      element: <VerifyAccount />
    },
    {
      path: "/change-password",
      exact: true,
      element: <ChangePassword />
    },
    {
      path: "/sign-up",
      exact: true,
      element: <Signup />
    },
    {
      path: "/products",
      exact: true,
      element: (
        <section className="main">
          <Header />
          <div className="mainContent flex">
          <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
              <Sidebar />
            </div>
            <div className={`right-content p-5 ${isSidebarOpen ? 'w-[82%]' : 'w-[100%]'} transition-all`}>
              <Products />
            </div>
          </div>
        </section>
      ),
    },
    {
      path: "/category/list",
      exact: true,
      element: (
        <section className="main">
          <Header />
          <div className="mainContent flex">
          <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
              <Sidebar />
            </div>
            <div className={`right-content p-5 ${isSidebarOpen ? 'w-[82%]' : 'w-[100%]'} transition-all`}>
              <CategoryList />
            </div>
          </div>
        </section>
      ),
    },
    {
      path: "/homeSlider/list",
      exact: true,
      element: (
        <section className="main">
          <Header />
          <div className="mainContent flex">
          <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
              <Sidebar />
            </div>
            <div className={`right-content p-5 ${isSidebarOpen ? 'w-[82%]' : 'w-[100%]'} transition-all`}>
              <HomeSliderBanners />
            </div>
          </div>
        </section>
      ),
    },
    {
      path: "/subCategory/list",
      exact: true,
      element: (
        <section className="main">
          <Header />
          <div className="mainContent flex">
          <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
              <Sidebar />
            </div>
            <div className={`right-content p-5 ${isSidebarOpen ? 'w-[82%]' : 'w-[100%]'} transition-all`}>
              <SubCategoryList />
            </div>
          </div>
        </section>
      ),
    },
    {
      path: "/users",
      exact: true,
      element: (
        <section className="main">
          <Header />
          <div className="mainContent flex">
          <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
              <Sidebar />
            </div>
            <div className={`right-content p-5 ${isSidebarOpen ? 'w-[82%]' : 'w-[100%]'} transition-all`}>
              <Users />
            </div>
          </div>
        </section>
      ),
    },
    {
      path: "/profile",
      exact: true,
      element: (
        <section className="main">
          <Header />
          <div className="mainContent flex">
          <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
              <Sidebar />
            </div>
            <div className={`right-content p-5 ${isSidebarOpen ? 'w-[82%]' : 'w-[100%]'} transition-all`}>
              <Profile />
            </div>
          </div>
        </section>
      ),
    },
    {
      path: "/orders",
      exact: true,
      element: (
        <section className="main">
          <Header />
          <div className="mainContent flex">
          <div className={`sidebarWrapper overflow-hidden ${isSidebarOpen ? 'w-[18%]' : 'w-[0px] opacity-0'} transition-all`}>
              <Sidebar />
            </div>
            <div className={`right-content p-5 ${isSidebarOpen ? 'w-[82%]' : 'w-[100%]'} transition-all`}>
              <Orders />
            </div>
          </div>
        </section>
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
    setIsOpenFullScreenPannel
  }

  return (
    <>
    <MyContext.Provider value={values}>
      <RouterProvider router={router} />
      <Dialog
        fullScreen
        open={isOpenFullScreenPannel.open}
        onClose={handleCloseFullScreenPannel}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseFullScreenPannel}
              aria-label="close"
            >
              <IoMdClose className="text-gray-800" />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <span className="text-gray-800">{isOpenFullScreenPannel?.model}</span>
            </Typography>
          </Toolbar>
        </AppBar>
        {
          isOpenFullScreenPannel.model === 'Add Product' && <AddProduct />
        }
        {
          isOpenFullScreenPannel.model === 'Add Home Slide' && <AddHomeSlide />
        }
        {
          isOpenFullScreenPannel.model === 'Add New Category' && <AddNewCategory />
        }
        {
          isOpenFullScreenPannel.model === 'Add New Sub Category' && <AddNewSubCategory />
        }
        {
          isOpenFullScreenPannel.model === 'Add New Address' && <AddNewAddress />
        }
      </Dialog>
      <Toaster />
    </MyContext.Provider>
    </>
  );
}

export default App;
export { MyContext }