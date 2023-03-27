import {
  useAuth,
  useCollection,
  usePolybase,
  useRecord,
} from "@polybase/react";
import React from "react";
import OptionsModal from "../../Helpers/OptionsModal";
import { BsChevronDown } from "react-icons/bs";
import ContractSelectionModal from "./ContractSelectionModal";
import { useContractStore } from "@/store/contract";
import { ContractType } from "@/types/contract";
import { useNotify } from "@/components/Contexts/NotifyProvider";

const ContractSelection = () => {
  const [showCollections, setShowCollections] = React.useState(false);
  const currentContract = useContractStore((state) => state.currentContract);
  const setCurrentContract = useContractStore(
    (state) => state.setCurrentContract
  );
  const pb = usePolybase();
  const { data } = useRecord<ContractType>(
    pb.collection("Contract").record(String(currentContract?.id))
  );
  const { state } = useAuth();
  const { notifyInfo } = useNotify();

  React.useEffect(() => {
    if (!data?.data) return;
    setCurrentContract(data?.data);
  }, [data?.data]);

  return (
    <OptionsModal
      OptionsPopUpModal={<ContractSelectionModal />}
      setShowModal={setShowCollections}
      showModal={showCollections}
      beforeButtonClick={(callback) => {
        if (!state?.userId) {
          notifyInfo("Please login to select a contract");
          return;
        }
        callback();
      }}
    >
      <div className="w-full text font-semibold border border-p-border rounded-xl py-1 px-3 my-2 mb-4 centered-row">
        {currentContract ? (
          <div className="flex flex-col w-full text-md font-semibold text-sm">
            <div>{currentContract.name}</div>
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
