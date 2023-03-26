import AddContractButton from "@/components/AddContractButton/AddContractButton";
import { ContractType } from "@/types/contract";
import { ContractAccessType } from "@/types/contractAccess";
import { FolderType } from "@/types/folder";
import { useAuth, useCollection, usePolybase } from "@polybase/react";
import React from "react";
import AccessContractList from "./AccessContractList";
import AddFolderButton from "./AddFolderButton";
import ContractSelect from "./ContractSelect";
import ContractSelectWithJustContractId from "./ContractSelectWithJustContractId";
import CreatedContractList from "./CreatedContractList";
import FolderAndTheirContractComponent from "./FolderAndTheirContractComponent";

export interface FolderAndTheirContractsType {
  folder: FolderType | null;
  contracts: ContractType[] | [];
}

const ContractSelectionModal = () => {
  const pb = usePolybase();
  const { state } = useAuth();
  const [leftCreatedContracts, setLeftCreatedContracts] = React.useState<
    ContractType[]
  >([]);
  const [leftAccessContracts, setLeftAccessContracts] = React.useState<
    ContractAccessType[]
  >([]);

  const [foldersAndTheirContracts, setFoldersAndTheirContracts] =
    React.useState<FolderAndTheirContractsType[]>([]);

  const { data: createdContracts } = useCollection<ContractType>(
    pb.collection("Contract").where("creatorPublicKey", "==", state?.publicKey)
  );

  const { data: accessContracts } = useCollection<ContractAccessType>(
    pb
      .collection("ContractAccess")
      .where("accessUserId", "==", String(state?.userId).toLowerCase())
  );

  const { data: folders } = useCollection<FolderType>(
    pb.collection("Folder").where("createdBy", "==", state?.userId)
  );

  React.useEffect(() => {
    let _createdContracts =
      createdContracts?.data?.map((c) => ({
        ...c,
        type: "created",
      })) || [];
    let _accessContracts =
      accessContracts?.data?.map((c) => ({
        ...c,
        type: "access",
      })) || [];
    const allFolders = folders?.data;
    const _foldersAndTheirContracts: FolderAndTheirContractsType[] = [];

    for (let i = 0; i < allFolders?.length; i++) {
      const folder = allFolders[i]?.data;
      const folderContractIds = folder.contractsId;
      let folderContracts = [];
      folderContracts = _createdContracts.filter((contract) => {
        return folderContractIds.includes(contract.data?.id);
      });

      folderContracts = folderContracts.concat(
        _accessContracts.filter((contract) => {
          return folderContractIds.includes(contract.data?.id);
        })
      );

      _createdContracts = _createdContracts.filter((contract) => {
        return !folderContractIds.includes(contract.data?.id);
      });

      _accessContracts = _accessContracts.filter((contract) => {
        return !folderContractIds.includes(contract.data?.id);
      });

      _foldersAndTheirContracts.push({
        folder,
        // @ts-ignore
        contracts: folderContracts,
      });
    }

    // @ts-ignore
    setFoldersAndTheirContracts(_foldersAndTheirContracts);
    setLeftCreatedContracts(_createdContracts?.map((c) => c.data));
    setLeftAccessContracts(_accessContracts?.map((c) => c.data));
  }, [createdContracts?.data, accessContracts?.data, folders?.data]);

  return (
    <div className="w-[360px] py-2 pb-8">
      {/* <AddContractButton /> */}
      <AddFolderButton />

      <FolderAndTheirContractComponent
        foldersAndTheirContracts={foldersAndTheirContracts}
        leftCreatedContracts={leftCreatedContracts}
        leftAccessContracts={leftAccessContracts}
      />

      {leftCreatedContracts?.length > 0 &&
        leftCreatedContracts.map((c) => (
          <ContractSelect key={c.id} contract={c} />
        ))}

      {leftAccessContracts?.length > 0 &&
        leftAccessContracts.map((c) => (
          <ContractSelectWithJustContractId key={c.id} id={c.id} />
        ))}
    </div>
  );
};

export default ContractSelectionModal;
