import { useContractStore } from "@/store/contract";
import React from "react";

const ContractPage = () => {
  const currentContract = useContractStore((state) => state.currentContract);
  //   const [] = React.useState<String>()
  return (
    <div className="p-4">
      <div className="text-xl font-semibold">{currentContract?.name}</div>
      <div className="text-sm text-s-text">
        {currentContract?.contractAddress}
      </div>
      {/* description */}
      <div className="text-sm text-s-text mt-4">
        {currentContract?.description}
      </div>
    </div>
  );
};

export default ContractPage;
