import { useContractStore } from "@/store/contract";
import React from "react";
import FunctionInputsAndCall from "./FunctionInputsAndCall";
import SelectedFunctionDescription from "./SelectedFunctionDescription";

const FunctionSection = () => {
  const selectedFunction = useContractStore((state) => state.selectedFunction);
  return (
    <div className="border-t border-p-borer my-4 p-4 flex flex-col">
      <div className="h-full overflow-y-auto">
        <div className="font-bold text-4xl">{selectedFunction?.name}</div>
        <SelectedFunctionDescription />
        {/* <div className="text-xs  text-s-text">
          Statemutability:{" "}
          <span className="font-semibold">
            {selectedFunction?.stateMutability}
          </span>
        </div> */}
        <FunctionInputsAndCall />
      </div>
    </div>
  );
};

export default FunctionSection;
