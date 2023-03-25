import { useNotify } from "@/components/Contexts/NotifyProvider";
import { useContractStore } from "@/store/contract";
import React from "react";
import { ethers } from "ethers";
import ReturnOutput from "./ReturnOutput";
import clsx from "clsx";

const FunctionInputsAndCall = () => {
  const [calling, setCalling] = React.useState<string | null>(null);
  const selectedFunction = useContractStore((state) => state.selectedFunction);
  const currentContract = useContractStore((state) => state.currentContract);
  const [inputs, setInputs] = React.useState<any[]>([]);
  const [returns, setReturns] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (!selectedFunction) return;
    console.log(selectedFunction);
    setInputs([]);
    setReturns([]);
  }, [selectedFunction?.name]);

  console.log(selectedFunction);
  const { notifyError, notifySuccess } = useNotify();

  const onCall = async () => {
    try {
      setCalling("Calling...");
      // @ts-ignore
      if (window.ethereum) {
        // @ts-ignore
        await window.ethereum.enable();
      }
      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window?.ethereum);
      const signer = provider.getSigner();
      const accountAddress = await signer.getAddress();
      console.log(accountAddress);
      const contract = new ethers.Contract(
        currentContract?.contractAddress,
        currentContract?.abi,
        signer
      );

      // call the function
      const res = await contract[selectedFunction?.name]?.(...inputs);
      console.log(res);

      if (
        selectedFunction?.stateMutability === "nonpayable" ||
        selectedFunction?.stateMutability === "payable"
      ) {
        setCalling("Waiting for confirmation...");
        await res.wait();
        notifySuccess("Transaction successful");
      } else {
        notifySuccess("Call successful");
      }
      setReturns([res]);
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong | " + error?.reason);
    } finally {
      setCalling(null);
    }
  };

  return (
    <>
      {/* inputs */}
      <div className="my-4">
        <div className="text-2xl font-bold">Inputs</div>
        {selectedFunction?.inputs.length === 0 ? (
          <div className="text-xs text-s-text">No inputs Required</div>
        ) : (
          <div className="flex flex-col">
            {selectedFunction?.inputs.map((input, i) => (
              <div key={i} className="flex flex-col my-2">
                <div className="text-sm font-semibold text-s-text">
                  {input?.name}
                </div>
                <input
                  className="border border-p-border rounded-md p-2"
                  placeholder={input.type}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* call button */}
      <div className="mt-4">
        <button
          className={clsx(
            "text-white font-bold py-2 px-6 rounded-lg start-row ",
            selectedFunction?.stateMutability === "pure" && "bg-pure",
            selectedFunction?.stateMutability === "view" && "bg-view",
            selectedFunction?.stateMutability === "nonpayable" &&
              "bg-nonpayable",
            selectedFunction?.stateMutability === "payable" && "bg-payable"
          )}
          disabled={!!calling}
          onClick={onCall}
        >
          {calling && <div className="spinner border-white"></div>}
          <div>{calling ? calling : "Call"} </div>
        </button>
      </div>

      {/* returns */}

      <div className="my-4">
        <div className="text-2xl font-bold">Returns</div>
        {selectedFunction?.outputs.length === 0 ? (
          <div className="text-xs text-s-text">No return values expected</div>
        ) : (
          <div className="flex flex-col">
            {selectedFunction?.outputs.map((output, i) => (
              <div key={i} className="flex flex-col my-2">
                <div className="text-lg font-semibold ">{output?.name}</div>
                {/* type */}
                <div className="text-lg start-row font-semibold ">
                  <span className="text-s-text">{i}</span> :{" "}
                  <span className="start-row">
                    <ReturnOutput value={returns[i]} />{" "}
                    <div
                      className={clsx(returns[i] ? "text-s-text text-xs" : "")}
                    >
                      {returns[i] ? `(${output?.type})` : output?.type}
                    </div>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FunctionInputsAndCall;
