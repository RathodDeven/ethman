import { useContractStore } from "@/store/contract";
import { ethers } from "ethers";
import { FunctionFragment } from "ethers/types/abi";
import React, { useEffect } from "react";
import ContractFunctionElement from "./ContractFunctionElement";

const ContractFunctionsList = () => {
  const currentContract = useContractStore((state) => state.currentContract);
  const [pureFunctions, setPureFunctions] = React.useState<FunctionFragment[]>(
    []
  );
  const [viewFunctions, setViewFunctions] = React.useState<FunctionFragment[]>(
    []
  );
  const [nonPayableFunctions, setNonPayableFunctions] = React.useState<
    FunctionFragment[]
  >([]);
  const [payableFunctions, setPayableFunctions] = React.useState<
    FunctionFragment[]
  >([]);

  useEffect(() => {
    if (!currentContract?.abi) {
      setPureFunctions([]);
      setViewFunctions([]);
      setNonPayableFunctions([]);
      setPayableFunctions([]);
      return;
    }
    const iface = new ethers.Interface(currentContract.abi);
    const _pureFunctions: FunctionFragment[] = [];
    const _viewFunctions: FunctionFragment[] = [];
    const _nonPayableFunctions: FunctionFragment[] = [];
    const _payableFunctions: FunctionFragment[] = [];
    iface.forEachFunction((f) => {
      console.log(f);

      if (f.stateMutability === "pure") {
        _pureFunctions.push(f);
      } else if (f.stateMutability === "view") {
        _viewFunctions.push(f);
      } else if (f.stateMutability === "nonpayable") {
        _nonPayableFunctions.push(f);
      } else if (f.stateMutability === "payable") {
        _payableFunctions.push(f);
      }
    });

    setPureFunctions(_pureFunctions);
    setViewFunctions(_viewFunctions);
    setNonPayableFunctions(_nonPayableFunctions);
    setPayableFunctions(_payableFunctions);
  }, [currentContract?.abi]);

  if (!currentContract)
    return (
      <div className="mt-40 centered-row">
        Select a contract to view its functions
      </div>
    );

  return (
    <div className="h-full overflow-y-auto">
      {pureFunctions.length > 0 && (
        <div className="flex flex-col py-1 my-1">
          <div className="text-xs text-s-text ">Pure Functions </div>
          {pureFunctions.map((f) => (
            <ContractFunctionElement functionItem={f} key={f.name} />
          ))}
        </div>
      )}

      {viewFunctions.length > 0 && (
        <div className="flex flex-col py-1 my-1">
          <div className="text-xs text-s-text ">View Functions </div>
          {viewFunctions.map((f) => (
            <ContractFunctionElement functionItem={f} key={f.name} />
          ))}
        </div>
      )}

      {nonPayableFunctions.length > 0 && (
        <div className="flex flex-col py-1 my-1">
          <div className="text-xs text-s-text ">Non Payable Functions </div>
          {nonPayableFunctions.map((f) => (
            <ContractFunctionElement functionItem={f} key={f.name} />
          ))}
        </div>
      )}

      {payableFunctions.length > 0 && (
        <div className="flex flex-col py-1 my-1">
          <div className="text-xs text-s-text ">Payable Functions </div>
          {payableFunctions.map((f) => (
            <ContractFunctionElement functionItem={f} key={f.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContractFunctionsList;
