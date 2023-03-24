import React from "react";
import AccessContractList from "./AccessContractList";
import CreatedContractList from "./CreatedContractList";

const ContractSelectionModal = () => {
  return (
    <div className="w-[260px] py-2">
      <CreatedContractList />
      <AccessContractList />
    </div>
  );
};

export default ContractSelectionModal;
