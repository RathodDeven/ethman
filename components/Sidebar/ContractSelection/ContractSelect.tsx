import { useContractStore } from "@/store/contract";
import { ContractType } from "@/types/contract";
import React from "react";

const ContractSelect = ({ contract }: { contract: ContractType }) => {
  const setCurrentContract = useContractStore(
    (state) => state.setCurrentContract
  );

  const onSelect = () => {
    setCurrentContract(contract);
  };

  if (!contract) return <div>loading</div>;

  return (
    <button
      onClick={onSelect}
      className="w-full my-1 py-1 px-2 flex flex-col border border-p-border rounded-md hover:bg-p-bg hover:border-p-border items-start "
    >
      <div className="truncate">{contract.name}</div>
      <div className="text-xs text-s-text truncate w-full">
        {contract.contractAddress}
      </div>
    </button>
  );
};

export default ContractSelect;
