import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { usePopUp } from "../Contexts/PopUpProvider";
import AddContractModal from "./AddContractModal";

const AddContractButton = () => {
  const { showModal } = usePopUp();
  const onButtonClick = () => {
    showModal({
      component: <AddContractModal />,
    });
  };
  return (
    <button
      onClick={onButtonClick}
      className="centered-row border-p-border border rounded-lg bg-s-bg hover:bg-p-bg cursor-pointer p-2 px-3"
    >
      <AiOutlinePlus /> <div className="font-semibold">Contract</div>
    </button>
  );
};

export default AddContractButton;
