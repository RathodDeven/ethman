import React from "react";
import clsx from "clsx";
import { useContractStore } from "@/store/contract";

const ContractFunctionElement = ({ functionItem }) => {
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
        "w-full border-2 rounded-xl my-2 py-2 px-6 font-bold cursor-pointer",
        functionItem.stateMutability === "pure" &&
          clsx(
            "border-pure",
            selectedFunction?.name === functionItem.name && "bg-pure text-white"
          ),
        functionItem.stateMutability === "view" &&
          clsx(
            "border-view",
            selectedFunction?.name === functionItem.name && "bg-view text-white"
          ),
        functionItem.stateMutability === "nonpayable" &&
          clsx(
            "border-nonpayable",
            selectedFunction?.name === functionItem.name &&
              "bg-nonpayable text-white"
          ),
        functionItem.stateMutability === "payable" &&
          clsx(
            "border-payable",
            selectedFunction?.name === functionItem.name &&
              "bg-payable text-white"
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
