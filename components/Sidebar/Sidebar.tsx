import React from "react";
import ContractFunctionsList from "./ContractFunctions/ContractFunctionsList";
import ContractSelection from "./ContractSelection/ContractSelection";

const Sidebar = () => {
  return (
    <div className="relative border flex flex-col rounded-xl p-3 border-p-border bg-s-bg w-[400px] h-full">
      {/* contract selection */}
      <ContractSelection />
      {/* contract functions */}
      <ContractFunctionsList />
    </div>
  );
};

export default Sidebar;
