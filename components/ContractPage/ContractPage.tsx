import { useContractStore } from "@/store/contract";
import Link from "next/link";
import React from "react";
import { AiOutlineLink } from "react-icons/ai";
import ContractDescription from "./ContractDescription";
import ContractName from "./ContractName";
import SettingsButton from "./Settings/SettingsButton";

const ContractPage = () => {
  const currentContract = useContractStore((state) => state.currentContract);
  return (
    <div className="p-4">
      <div className="space-between-row">
        <ContractName contract={currentContract} />
        <Link
          href={`https://mumbai.polygonscan.com/address/${currentContract?.contractAddress}`}
          target={"_blank"}
          className="text-xs text-s-text hover:underline start-row"
        >
          <AiOutlineLink />
          <div>{currentContract?.contractAddress}</div>
        </Link>
      </div>
      <div className="space-between-row">
        {/* description */}
        <ContractDescription contract={currentContract} />
        <SettingsButton />
      </div>
    </div>
  );
};

export default ContractPage;
