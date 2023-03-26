import { useNotify } from "@/components/Contexts/NotifyProvider";
import { usePopUp } from "@/components/Contexts/PopUpProvider";
import PopUpWrapper from "@/components/Helpers/PopUpWrapper";
import { randomString } from "@/utils/helper";
import { useAuth, usePolybase } from "@polybase/react";
import React from "react";
import { BsFolderPlus } from "react-icons/bs";

const AddFolderPopUp = () => {
  const [loading, setLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { state } = useAuth();
  const pb = usePolybase();
  const { notifyError, notifySuccess } = useNotify();
  const { hideModal } = usePopUp();

  const createFolder = async () => {
    try {
      setLoading(true);
      const folderName = String(inputRef.current?.value);
      if (!folderName) {
        return;
      }
      const id = randomString(10);
      await pb.collection("Folder").create([id, folderName, state?.userId]);
      inputRef.current!.value = "";
      notifySuccess("Folder Created Successfully");
      hideModal();
    } catch (error) {
      console.log(error);
      notifyError(error?.reason ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <PopUpWrapper
      Icon={<BsFolderPlus />}
      title="Create Folder"
      label="Create"
      loading={loading}
      isDisabled={loading}
      onClick={createFolder}
    >
      <div className="flex flex-col w-full">
        <div className="text-xs text-s-text">Folder Name</div>
        <input
          ref={inputRef}
          className="border border-p-border rounded-lg p-2"
        />
      </div>
    </PopUpWrapper>
  );
};

export default AddFolderPopUp;
