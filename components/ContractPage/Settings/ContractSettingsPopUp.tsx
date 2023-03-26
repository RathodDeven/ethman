import { useNotify } from "@/components/Contexts/NotifyProvider";
import { usePopUp } from "@/components/Contexts/PopUpProvider";
import PopUpWrapper from "@/components/Helpers/PopUpWrapper";
import { useContractStore } from "@/store/contract";
import { usePolybase } from "@polybase/react";
import { useRouter } from "next/router";
import React from "react";
import { FiSettings } from "react-icons/fi";
import { GrDocumentUpdate } from "react-icons/gr";
import ContractAccessControl from "./ContractAccessControl";
import UpdateABIModal from "./UpdateABIModal";

const ContractSettingsPopUp = () => {
  const router = useRouter();
  const { showModal } = usePopUp();
  const currentContract = useContractStore((state) => state.currentContract);
  const setCurrentContract = useContractStore(
    (state) => state.setCurrentContract
  );
  const pb = usePolybase();
  const { notifyError } = useNotify();
  const onDeleteContract = async () => {
    try {
      await pb
        .collection("Contract")
        .record(String(currentContract?.id))
        .call("del");

      // reload the page
      router.reload();
    } catch (error) {
      console.log(error);
      notifyError("Error deleting contract" + error?.reason);
    }
  };

  return (
    <PopUpWrapper Icon={<FiSettings />} title="Contract Settings">
      <button
        onClick={() => {
          showModal({
            component: <UpdateABIModal />,
          });
        }}
        className="start-row border border-p-border hover:bg-p-bg px-2 py-1 rounded-md"
      >
        <GrDocumentUpdate className="w-3 h-3" />
        <div>Update Contract</div>
      </button>
      <ContractAccessControl />
      <button
        onClick={onDeleteContract}
        className="px-4 py-2 my-2 bg-red-500 text-white font-bold text-md rounded-xl"
      >
        Delete Contracts
      </button>
    </PopUpWrapper>
  );
};

export default ContractSettingsPopUp;
