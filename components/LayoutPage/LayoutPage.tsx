import React from "react";
import Navbar from "./Navbar";
import Sidebar from "../Sidebar/Sidebar";
// import GroupMessageSidebar from "../GroupMessage/GroupMessageSidebar";

const LayoutPage = ({ children }) => {
  return (
    <div className="h-[100vh] flex flex-col bg-p-bg relative">
      <Navbar />
      <div className="flex flex-row h-[calc(100vh-100px)] relative bg-p-bg m-6">
        {/* sidebar */}
        <div className="mr-3">
          <Sidebar />
        </div>

        {/* main content */}
        <div className="flex-1 border-p-border border bg-s-bg rounded-xl mx-3">
          {children}
        </div>

        {/* right comment sidebar if group messaging someone*/}
        {/* {currentContract?.creatorAddress?.toLowerCase() !== state?.userId && (
          <div className="ml-3">
            <GroupMessageSidebar />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default LayoutPage;
