import { ContractType } from "@/types/contract";
import { usePolybase, useRecord } from "@polybase/react";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const ContractAddressSelect = ({ id, onSelectContractAddress }) => {
  const pb = usePolybase();

  const { data } = useRecord<ContractType>(
    pb.collection("Contract").record(id)
  );
  if (!data?.data?.contractAddress) return null;
  return (
    <button
      onClick={() => {
        onSelectContractAddress(data.data.contractAddress);
      }}
      className="px-4 py-1 start-row hover:bg-p-bg cursor-pointer w-fit rounded-full my-2"
    >
      <AiOutlinePlus />
      <div>{data?.data?.contractAddress}</div>
    </button>
  );
};

export default ContractAddressSelect;
