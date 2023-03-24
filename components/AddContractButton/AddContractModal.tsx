import { randomString } from "@/utils/helper";
import { usePolybase } from "@polybase/react";
import React from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useNotify } from "../Contexts/NotifyProvider";
import { usePopUp } from "../Contexts/PopUpProvider";
import PopUpWrapper from "../Helpers/PopUpWrapper";

const AddContractModal = () => {
  const [contractName, setContractName] = React.useState<string>("");
  const [contractAddress, setContractAddress] = React.useState<string>("");
  const [contractABI, setContractABI] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const { notifyError, notifySuccess } = useNotify();
  const { hideModal } = usePopUp();

  const pb = usePolybase();

  const onSave = async () => {
    try {
      setLoading(true);
      const id = randomString(10);
      const { data } = await pb
        .collection("Contract")
        .create([id, contractName, contractABI, contractAddress]);
      if (data) {
        notifySuccess("Contract Added Successfully");
        hideModal();
      }
    } catch (error) {
      notifyError(error?.reason ?? "Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <PopUpWrapper
      Icon={<AiOutlineFileAdd />}
      label="Save"
      title="Add Contract"
      onClick={onSave}
      loading={loading}
    >
      <div className="text-xs text-s-text">
        Only Mumbai Contracts Allowed for now*
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold">Contract Name</div>
          <input
            className="border border-p-border rounded-lg p-2"
            name="contractName"
            value={contractName}
            onChange={(e) => setContractName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold">Contract Address</div>
          <input
            className="border border-p-border rounded-lg p-2"
            name="contractAddress"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold">Contract ABI</div>
          <textarea
            className="border border-p-border h-40 rounded-lg p-2"
            name="contractABI"
            value={contractABI}
            onChange={(e) => setContractABI(e.target.value)}
          />
        </div>
      </div>
    </PopUpWrapper>
  );
};

export default AddContractModal;
