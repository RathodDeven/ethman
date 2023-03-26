import { usePopUp } from "@/components/Contexts/PopUpProvider";
import PopUpWrapper from "@/components/Helpers/PopUpWrapper";
import React from "react";
import { FolderAndTheirContractsType } from "./ContractSelectionModal";
import { RiFolderSettingsLine } from "react-icons/ri";
import { usePolybase } from "@polybase/react";
import { useNotify } from "@/components/Contexts/NotifyProvider";
import { join } from "path";
import { ContractType } from "@/types/contract";
import { ContractAccessType } from "@/types/contractAccess";
import { AiOutlinePlus } from "react-icons/ai";
import ContractAddressSelect from "./ContractAddressSelect";

const FolderManagement = ({
  folderAndItsContracts,
  leftCreatedContracts,
  leftAccessContracts,
}: {
  folderAndItsContracts: FolderAndTheirContractsType;
  leftCreatedContracts: ContractType[];
  leftAccessContracts: ContractAccessType[];
}) => {
  const { hideModal } = usePopUp();
  const pb = usePolybase();
  const { notifyError, notifySuccess } = useNotify();

  console.log("folderAndItsContracts", folderAndItsContracts);
  console.log("leftCreatedContracts", leftCreatedContracts);
  console.log("leftAccessContracts", leftAccessContracts);

  const deleteFolder = async () => {
    try {
      await pb
        .collection("Folder")
        .record(folderAndItsContracts.folder.id)
        .call("del");
      notifySuccess("Folder Deleted Successfully");
      hideModal();
    } catch (error) {
      notifyError(error?.reason ?? "Something went wrong");
      console.log(error);
    }
  };

  const addContractToFolder = async (contractId: string) => {
    try {
      await pb
        .collection("Folder")
        .record(folderAndItsContracts.folder.id)
        .call("addContractId", [contractId]);

      notifySuccess("Contract Added Successfully");
      hideModal();
    } catch (error) {
      notifyError(error?.reason ?? "Something went wrong");
      console.log(error);
    }
  };

  return (
    <PopUpWrapper
      Icon={<RiFolderSettingsLine />}
      title="Folder Management"
      onClick={hideModal}
      label="Done"
    >
      <div className="flex flex-col w-full">
        <div className="text-s-text text-sm fond-semibold">
          Select Contract to add to the folder
        </div>

        {leftCreatedContracts?.length > 0 &&
          leftCreatedContracts.map((contract) => {
            return (
              <button
                key={contract.id}
                onClick={() => addContractToFolder(contract.id)}
                className="px-4 py-1 start-row hover:bg-p-bg cursor-pointer w-fit rounded-full my-2"
              >
                <AiOutlinePlus />
                <div>{contract.contractAddress}</div>
              </button>
            );
          })}
        {leftAccessContracts?.length > 0 &&
          leftAccessContracts.map((contract) => {
            return (
              <ContractAddressSelect
                id={contract.contract.id}
                onSelectContractAddress={async (addr) => {
                  addContractToFolder(addr);
                }}
                key={contract.contract.id}
              />
            );
          })}

        <button
          onClick={deleteFolder}
          className="border w-fit border-p-border rounded-lg p-2 mt-6 bg-red-500 text-white font-bold"
        >
          Delete Folder
        </button>
      </div>
    </PopUpWrapper>
  );
};

export default FolderManagement;
