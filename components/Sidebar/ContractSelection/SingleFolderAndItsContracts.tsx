import { usePopUp } from "@/components/Contexts/PopUpProvider";
import { ContractType } from "@/types/contract";
import { ContractAccessType } from "@/types/contractAccess";
import clsx from "clsx";
import React from "react";
import { BsChevronDown, BsThreeDots } from "react-icons/bs";
import ContractSelect from "./ContractSelect";
import { FolderAndTheirContractsType } from "./ContractSelectionModal";
import ContractSelectWithJustContractId from "./ContractSelectWithJustContractId";
import FolderManagement from "./FolderManagement";

const SingleFolderAndItsContracts = ({
  folderAndItsContracts,
  leftCreatedContracts,
  leftAccessContracts,
}: {
  folderAndItsContracts: FolderAndTheirContractsType;
  leftCreatedContracts: ContractType[];
  leftAccessContracts: ContractAccessType[];
}) => {
  const [showContracts, setShowContracts] = React.useState(true);
  const [hovering, setHovering] = React.useState(false);
  const { showModal } = usePopUp();

  const showFolderManagement = () => {
    showModal({
      component: (
        <FolderManagement
          folderAndItsContracts={folderAndItsContracts}
          leftCreatedContracts={leftCreatedContracts}
          leftAccessContracts={leftAccessContracts}
        />
      ),
    });
  };

  console.log("folderAndItsContracts", folderAndItsContracts);

  return (
    <>
      <div
        onClick={() => {
          setShowContracts(!showContracts);
        }}
        className="space-between-row px-2 font-semibold text-s-text"
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => {
          setHovering(false);
        }}
      >
        <div className="start-row">
          {showContracts ? (
            <BsChevronDown />
          ) : (
            <BsChevronDown className="transform -rotate-90" />
          )}
          <div>{folderAndItsContracts?.folder?.name}</div>
        </div>
        <button
          className={
            (clsx(hovering ? "block" : "hidden"),
            "px-2 py-1 hover:bg-p-bg rounded-md")
          }
          onClick={(e) => {
            e.stopPropagation();
            showFolderManagement();
          }}
        >
          <BsThreeDots />
        </button>
      </div>

      {/* folders contracts */}

      {showContracts &&
        folderAndItsContracts?.contracts?.map((contract) => {
          console.log("contract", contract);
          if (contract.type === "created") {
            return (
              <ContractSelect key={contract.id} contract={contract?.data} />
            );
          }
          if (contract.type === "accessed") {
            return (
              <ContractSelectWithJustContractId
                key={contract.id}
                id={contract.id}
              />
            );
          }
          return null;
        })}
    </>
  );
};

export default SingleFolderAndItsContracts;