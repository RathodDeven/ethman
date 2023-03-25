import { useContractStore } from "@/store/contract";
// import { Tooltip } from "@mui/material";
import { ethers } from "ethers";
import React, { useEffect } from "react";
import ContractFunctionElement from "./ContractFunctionElement";

const ContractFunctionsList = () => {
  const currentContract = useContractStore((state) => state.currentContract);
  const [pureFunctions, setPureFunctions] = React.useState([]);
  const [viewFunctions, setViewFunctions] = React.useState([]);
  const [nonPayableFunctions, setNonPayableFunctions] = React.useState([]);
  const [payableFunctions, setPayableFunctions] = React.useState([]);

  useEffect(() => {
    if (!currentContract?.abi) {
      setPureFunctions([]);
      setViewFunctions([]);
      setNonPayableFunctions([]);
      setPayableFunctions([]);
      return;
    }
    const iface = new ethers.utils.Interface(currentContract.abi);
    const _pureFunctions = [];
    const _viewFunctions = [];
    const _nonPayableFunctions = [];
    const _payableFunctions = [];

    for (const key in iface.functions) {
      const f = iface.functions[key];
      if (f.stateMutability === "pure") {
        _pureFunctions.push(f);
      } else if (f.stateMutability === "view") {
        _viewFunctions.push(f);
      } else if (f.stateMutability === "nonpayable") {
        _nonPayableFunctions.push(f);
      } else if (f.stateMutability === "payable") {
        _payableFunctions.push(f);
      }
    }

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
    <div className="h-full overflow-y-auto relative">
      {pureFunctions.length > 0 && (
        <div className="flex flex-col py-1 my-1">
          <div
            className="text-sm font-semibold text-s-text cursor-pointer"
            title="This functions does not require any gas and does not view or change the state of the contract."
          >
            Pure Functions{" "}
          </div>
          {pureFunctions.map((f) => (
            <ContractFunctionElement functionItem={f} key={f.name} />
          ))}
        </div>
      )}

      {viewFunctions.length > 0 && (
        <div className="flex flex-col py-1 my-1">
          <div
            className="text-sm font-semibold text-s-text cursor-pointer"
            title="This functions does not require any gas and does not change the state of the contract, but views the state."
          >
            View Functions{" "}
          </div>
          {viewFunctions.map((f) => (
            <ContractFunctionElement functionItem={f} key={f.name} />
          ))}
        </div>
      )}

      {nonPayableFunctions.length > 0 && (
        <div className="flex flex-col py-1 my-1">
          <div
            className="text-sm font-semibold text-s-text cursor-pointer"
            title="This functions requires gas and changes the state of the contract. However, it does not accept any ETH as extra payment."
          >
            Non Payable Functions{" "}
          </div>
          {nonPayableFunctions.map((f) => (
            <ContractFunctionElement functionItem={f} key={f.name} />
          ))}
        </div>
      )}

      {payableFunctions.length > 0 && (
        <div className="flex flex-col py-1 my-1">
          <div
            className="text-sm font-semibold text-s-text cursor-pointer"
            title="This functions requires gas and changes the state of the contract. It also accepts ETH as for extra payment."
          >
            Payable Functions{" "}
          </div>
          {payableFunctions.map((f) => (
            <ContractFunctionElement functionItem={f} key={f.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContractFunctionsList;
