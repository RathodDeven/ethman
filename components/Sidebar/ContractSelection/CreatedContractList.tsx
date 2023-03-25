import { ContractType } from "@/types/contract";
import { useAuth, useCollection, usePolybase } from "@polybase/react";
import React from "react";
import ContractSelect from "./ContractSelect";

const CreatedContractList = () => {
  const pb = usePolybase();
  const { state } = useAuth();
  const { data, error } = useCollection<ContractType>(
    pb.collection("Contract").where("creatorPublicKey", "==", state?.publicKey)
  );

  return (
    <>
      <div className="text-sm font-semibold text-s-text py-1 mb-3">
        Added Contracts :{" "}
      </div>
      {data?.data &&
        data?.data.length > 0 &&
        data?.data.map((d) => (
          <ContractSelect key={d.data.id} contract={d.data} />
        ))}
    </>
  );
};

export default CreatedContractList;
