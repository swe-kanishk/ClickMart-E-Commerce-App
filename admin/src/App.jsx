import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import React, { createContext, useState } from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Products from "./Pages/Products";

import Dialog from '@mui/material/Dialog';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { IoMdClose } from "react-icons/io";
import AddProduct from "./Pages/AddProduct";

const MyContext = createContext()

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false)

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
  ]);

  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin,
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
      </Dialog>
    </MyContext.Provider>
    </>
  );
}

export default App;
export { MyContext }