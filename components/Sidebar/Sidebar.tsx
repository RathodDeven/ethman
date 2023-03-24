import React from "react";
import ContractFunctionsList from "./ContractFunctions/ContractFunctionsList";
import ContractSelection from "./ContractSelection/ContractSelection";

const Sidebar = () => {
  return (
    <div className="border rounded-xl p-3 border-p-border bg-s-bg w-[300px] h-full">
      {/* contract selection */}
      <ContractSelection />
      {/* contract functions */}
      <ContractFunctionsList />
    </div>
  );
};

export default Sidebar;
