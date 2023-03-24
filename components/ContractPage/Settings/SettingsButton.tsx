import { usePopUp } from "@/components/Contexts/PopUpProvider";
import React from "react";
import { FiSettings } from "react-icons/fi";
import ContractSettingsPopUp from "./ContractSettingsPopUp";

const SettingsButton = () => {
  const { showModal } = usePopUp();
  return (
    <button
      className="start-row border border-p-border hover:bg-p-bg px-2 py-1 rounded-md"
      onClick={() => {
        showModal({
          component: <ContractSettingsPopUp />,
        });
      }}
    >
      <FiSettings className="w-3 h-3" />
      <div className="text-xs">Settings</div>
    </button>
  );
};

export default SettingsButton;
