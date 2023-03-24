import { useNotify } from "@/components/Contexts/NotifyProvider";
import { usePopUp } from "@/components/Contexts/PopUpProvider";
import PopUpWrapper from "@/components/Helpers/PopUpWrapper";
import { useContractStore } from "@/store/contract";
import { usePolybase } from "@polybase/react";
import React from "react";
import { GrDocumentUpdate } from "react-icons/gr";

const UpdateABIModal = () => {
  const currentContract = useContractStore((state) => state.currentContract);
  const contractAddressInputRef = React.useRef<HTMLInputElement>(null);
  const abiInputRef = React.useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = React.useState(false);

  const { notifyError, notifySuccess } = useNotify();
  const { hideModal } = usePopUp();
  const pb = usePolybase();

  const handleUpdateContract = async () => {
    try {
      setLoading(true);
      await pb
        .collection("Contract")
        .record(currentContract?.id)
        .call("updateContract", [
          String(abiInputRef.current.value),
          String(contractAddressInputRef.current.value),
        ]);

      notifySuccess("Contract updated successfully");
      hideModal();
    } catch (error) {
      notifyError(`Something went wrong | ${error?.message}`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <PopUpWrapper
      Icon={<GrDocumentUpdate />}
      title="Update ABI"
      onClick={handleUpdateContract}
      loading={loading}
    >
      <input
        type="text"
        className="px-2 py-1 outline-none border-p-border border-2 rounded-xl w-full mb-3"
        placeholder="Contract Address"
        ref={contractAddressInputRef}
        defaultValue={currentContract?.contractAddress}
      />
      {/* textearea for abi */}
      <textarea
        className="px-2 py-1 outline-none border-p-border border-2 rounded-xl w-full mb-3 h-40"
        placeholder="ABI"
        ref={abiInputRef}
        defaultValue={currentContract?.abi}
      />
    </PopUpWrapper>
  );
};

export default UpdateABIModal;
