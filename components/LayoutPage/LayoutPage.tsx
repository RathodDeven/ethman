import React from "react";
import Navbar from "./Navbar";
import Sidebar from "../Sidebar/Sidebar";

const LayoutPage = ({ children }) => {
  return (
    <div className="h-[100vh] flex flex-col bg-p-bg relative">
      <Navbar />
      <div className="flex flex-row h-full">
        {/* sidebar */}
        <div className="m-4">
          <Sidebar />
        </div>

        {/* main content */}
        <div className="flex-1 m-4 border-p-border border bg-s-bg rounded-xl">
          {children}
        </div>

        {/* right commnet sidebar if group messaging someone*/}
        {/* <div className="m-4">right sidebar</div> */}
      </div>
    </div>
  );
};

export default LayoutPage;
