import React from "react";
import PopUpWrapper from "../Helpers/PopUpWrapper";
import { BiRename } from "react-icons/bi";
const SetNameModal = () => {
  const handleSavename = async () => {};
  return (
    <PopUpWrapper
      Icon={<BiRename />}
      title="Set Name"
      label="Save"
      onClick={handleSavename}
    >
      SetName
    </PopUpWrapper>
  );
};

export default SetNameModal;
