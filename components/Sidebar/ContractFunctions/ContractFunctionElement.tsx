import React from "react";
import { FunctionFragment } from "ethers/types/abi";
import clsx from "clsx";
import { useContractStore } from "@/store/contract";

const ContractFunctionElement = ({
  functionItem,
}: {
  functionItem: FunctionFragment;
}) => {
  const selectedFunction = useContractStore((state) => state.selectedFunction);
  const setSelectedFunction = useContractStore(
    (state) => state.setSelectedFunction
  );
  return (
    <button
      onClick={() => {
        setSelectedFunction(functionItem);
      }}
      className={clsx(
        "w-full border-2 border-p-border rounded-xl my-2 py-2 px-6 font-bold cursor-pointer",
        functionItem.stateMutability === "pure" &&
          clsx(
            "border-[#FFD700]",
            selectedFunction?.name === functionItem.name &&
              "bg-[#FFD700] text-white"
          ),
        functionItem.stateMutability === "view" &&
          clsx(
            "border-[#00FF00]",
            selectedFunction?.name === functionItem.name &&
              "bg-[#00FF00] text-white"
          ),
        functionItem.stateMutability === "nonpayable" &&
          clsx(
            "border-[#FFA500]",
            selectedFunction?.name === functionItem.name &&
              "bg-[#FFA500] text-white"
          ),
        functionItem.stateMutability === "payable" &&
          clsx(
            "border-[#FFC0CB]",
            selectedFunction?.name === functionItem.name &&
              "bg-[#FFC0CB] text-white"
          )
      )}
    >
      {functionItem.name}
      {(functionItem.stateMutability === "pure" ||
        functionItem.stateMutability === "view") &&
        functionItem.payable && (
          <span className="text-xs text-s-text">Also payable</span>
        )}
    </button>
  );
};

export default ContractFunctionElement;
