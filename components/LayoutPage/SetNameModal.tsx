import React from "react";
import PopUpWrapper from "../Helpers/PopUpWrapper";
import { BiRename } from "react-icons/bi";
import { UserType } from "./Navbar";
import { usePolybase } from "@polybase/react";
import { useNotify } from "../Contexts/NotifyProvider";
import { usePopUp } from "../Contexts/PopUpProvider";
const SetNameModal = ({ user }: { user: UserType }) => {
  const pb = usePolybase();
  const userRecordRef = pb?.collection("User").record(String(user?.id));
  const [loading, setLoading] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { notifyError, notifySuccess } = useNotify();
  const { hideModal } = usePopUp();
  const handleSavename = async () => {
    try {
      setLoading(true);
      const userData = await userRecordRef?.call("setUserName", [
        String(inputRef.current.value),
      ]);
      notifySuccess("Name set successfully");
      hideModal();
      console.log(userData);
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <PopUpWrapper
      Icon={<BiRename />}
      title="Set Name"
      label="Save"
      loading={loading}
      onClick={handleSavename}
    >
      <input
        type="text"
        className="px-2 py-1 outline-none border-p-border border-2 rounded-xl w-full mb-3"
        placeholder="Set Name"
        ref={inputRef}
        defaultValue={user?.userName}
      />
    </PopUpWrapper>
  );
};

export default SetNameModal;
