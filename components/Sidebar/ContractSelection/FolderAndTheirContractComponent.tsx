import { ContractType } from "@/types/contract";
import { ContractAccessType } from "@/types/contractAccess";
import React from "react";
import ContractSelect from "./ContractSelect";
import { FolderAndTheirContractsType } from "./ContractSelectionModal";
import ContractSelectWithJustContractId from "./ContractSelectWithJustContractId";
import SingleFolderAndItsContracts from "./SingleFolderAndItsContracts";

const FolderAndTheirContractComponent = ({
  foldersAndTheirContracts,
  leftCreatedContracts,
  leftAccessContracts,
}: {
  foldersAndTheirContracts: FolderAndTheirContractsType[];
  leftCreatedContracts: ContractType[];
  leftAccessContracts: ContractAccessType[];
}) => {
  console.log("foldersAndTheirContracts", foldersAndTheirContracts);
  return (
    <>
      {foldersAndTheirContracts.map((folderAndTheirContracts, i) => {
        return (
          <SingleFolderAndItsContracts
            key={i}
            folderAndItsContracts={folderAndTheirContracts}
            leftCreatedContracts={leftCreatedContracts}
            leftAccessContracts={leftAccessContracts}
          />
        );
      })}
    </>
  );
};

export default FolderAndTheirContractComponent;
