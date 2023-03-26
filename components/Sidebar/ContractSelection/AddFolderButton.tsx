import { usePopUp } from "@/components/Contexts/PopUpProvider";
import React from "react";
import { BsFolderPlus } from "react-icons/bs";
import AddFolderPopUp from "./AddFolderPopUp";

const AddFolderButton = () => {
  const { showModal } = usePopUp();

  const showAddFolderModal = () => {
    showModal({
      component: <AddFolderPopUp />,
    });
  };
  return (
    <div
      className="start-row mx-2 py-2 px-4 rounded-xl hover:bg-p-bg w-fit cursor-pointer font-semibold"
      onClick={showAddFolderModal}
    >
      <BsFolderPlus className="w-4 h-4" />
    </div>
  );
};

export default AddFolderButton;
