import { ContractType } from "@/types/contract";
import { usePolybase, useRecord } from "@polybase/react";
import React from "react";
import ContractSelect from "./ContractSelect";

const ContractSelectWithJustContractId = ({ id }) => {
  const pb = usePolybase();
  const { data } = useRecord<ContractType>(
    pb.collection("Contract").record(id)
  );
  return <ContractSelect contract={data?.data} />;
};

export default ContractSelectWithJustContractId;
