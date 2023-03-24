import { usePopUp } from "@/components/Contexts/PopUpProvider";
import PopUpWrapper from "@/components/Helpers/PopUpWrapper";
import React from "react";
import { FiSettings } from "react-icons/fi";
import { GrDocumentUpdate } from "react-icons/gr";
import ContractAccessControl from "./ContractAccessControl";
import UpdateABIModal from "./UpdateABIModal";

const ContractSettingsPopUp = () => {
  const { showModal } = usePopUp();

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
    </PopUpWrapper>
  );
};

export default ContractSettingsPopUp;
