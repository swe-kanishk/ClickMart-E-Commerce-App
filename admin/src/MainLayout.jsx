import { useContext } from "react";
import Header from "./Components/Header";
import { MyContext } from "./App";
import Sidebar from "./Components/Sidebar";

const MainLayout = ({ children }) => {
  const context = useContext(MyContext);
  return (
    <section className="main relative">
      <Header />
      <div className="mainContent flex">
        <div
          className={`sidebarWrapper overflow-hidden ${
            context?.isSidebarOpen
              ? `w-[${context?.sidebarWidth}%]`
              : "w-[0px] opacity-0"
          } transition-all`}
        >
          <Sidebar />
          {context?.windowWidth < 992 && <div onClick={() => context?.setIsSidebarOpen(false)} className={`absolute top-0 z-40 right-0 h-[100lvh] w-full p-9 bg-[#100f0fbb]`}></div> }
        </div>
        <div
          className={`right-content ${context?.windowWidth < 992 && context?.isSidebarOpen && `hidden`} ${context?.windowWidth > 992 && context?.isSidebarOpen && `pl-[325px] pr-[2%] min-w-[100%]`} mt-[85px] transition-all`}
          style={{
            width: (context?.isSidebarOpen )
              ? `${100 - context?.sidebarWidth}%`
              : "100%",
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default MainLayout;
