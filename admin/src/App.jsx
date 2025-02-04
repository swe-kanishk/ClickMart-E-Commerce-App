import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import { createContext, useState } from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

const MyContext = createContext()

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false)

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
  ]);

  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin
  }

  return (
    <>
    <MyContext.Provider value={values}>
      <RouterProvider router={router} />
    </MyContext.Provider>
    </>
  );
}

export default App;
export { MyContext }