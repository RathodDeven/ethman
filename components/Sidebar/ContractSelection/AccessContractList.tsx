import { ContractType } from "@/types/contract";
import { ContractAccessType } from "@/types/contractAccess";
import { useAuth, useCollection, usePolybase } from "@polybase/react";
import React, { useState } from "react";
import ContractSelect from "./ContractSelect";
import ContractSelectWithJustContractId from "./ContractSelectWithJustContractId";

const AccessContractList = () => {
  const pb = usePolybase();
  const { state } = useAuth();
  const { data } = useCollection<ContractAccessType>(
    pb
      .collection("ContractAccess")
      .where("accessUserId", "==", String(state?.userId).toLowerCase())
  );

  return (
    <>
      <div className="text-xs text-s-text py-1 mb-3">Accessed Contracts : </div>
      {data?.data &&
        data?.data.map((d) => (
          <ContractSelectWithJustContractId
            key={d.data.id}
            id={d.data.contract.id}
          />
        ))}
    </>
  );
};

export default AccessContractList;
