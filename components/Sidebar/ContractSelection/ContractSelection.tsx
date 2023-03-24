import { useCollection, usePolybase } from "@polybase/react";
import React from "react";
import OptionsModal from "../../Helpers/OptionsModal";
import { BsChevronDown } from "react-icons/bs";
import ContractSelectionModal from "./ContractSelectionModal";
import { useContractStore } from "@/store/contract";

const ContractSelection = () => {
  const [showCollections, setShowCollections] = React.useState(false);
  const currentContract = useContractStore((state) => state.currentContract);
  return (
    <OptionsModal
      OptionsPopUpModal={<ContractSelectionModal />}
      setShowModal={setShowCollections}
      showModal={showCollections}
    >
      <div className="w-full text-lg font-semibold border border-p-border rounded-xl py-1 px-3 my-2 mb-4 centered-row">
        {currentContract ? (
          <div className="flex flex-col w-full text-md font-normal">
            <div>{currentContract.name}</div>
            <div className="truncate w-full text-xs text-s-text">
              {currentContract.contractAddress}
            </div>
          </div>
        ) : (
          <div>Select a contract</div>
        )}
        <BsChevronDown className="w-4 h-4" />
      </div>
    </OptionsModal>
  );
};

export default ContractSelection;
