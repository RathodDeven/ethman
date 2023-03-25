import { useNotify } from "@/components/Contexts/NotifyProvider";
import { UserType } from "@/components/LayoutPage/Navbar";
import { useContractStore } from "@/store/contract";
import { randomString } from "@/utils/helper";
import {
  useAuth,
  useCollection,
  usePolybase,
  useRecord,
} from "@polybase/react";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { TiTick } from "react-icons/ti";

const SelectedFunctionDescription = () => {
  const selectedFunction = useContractStore((state) => state.selectedFunction);
  const currentContract = useContractStore((state) => state.currentContract);
  const [editing, setEditing] = React.useState(false);
  const { state } = useAuth();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [hovering, setHovering] = React.useState(false);
  const { notifyError, notifySuccess } = useNotify();
  const pb = usePolybase();

  const { data: user } = useRecord<UserType>(
    pb.collection("User").record(String(state?.userId))
  );

  const handleEdit = async () => {
    try {
      const newDescription = inputRef.current?.value;
      await pb
        .collection("Contract")
        .record(currentContract?.id)
        .call("setDescriptionOfFunction", [
          selectedFunction?.name,
          newDescription,
        ]);
      notifySuccess("Description set successfully");
    } catch (error) {
      notifyError(`Something went wrong | ${error.message}`);
      console.log(error);
    } finally {
      setEditing(false);
    }
  };

  return (
    <div
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
      className="start-row text-sm"
    >
      {editing ? (
        <div className="start-row">
          <input
            type="text"
            ref={inputRef}
            className="text-sm min-w-[300px] font-semibold outline-none"
            placeholder="Add Description"
            defaultValue={
              currentContract?.functionDescription?.[selectedFunction?.name] ||
              ""
            }
          />
          <TiTick className="w-4 h-4 ml-2" onClick={handleEdit} />
        </div>
      ) : (
        <>
          {currentContract?.functionDescription?.[selectedFunction?.name] ? (
            <div className="text-sm font-semibold">
              {currentContract?.functionDescription?.[selectedFunction?.name]}
            </div>
          ) : (
            <div
              className="text-sm text-s-text font-semibold"
              onClick={() => {
                setEditing(true);
              }}
            >
              Add Description
            </div>
          )}
        </>
      )}
      {String(currentContract?.creatorPublicKey) ===
        String(user?.data?.publicKey) &&
        !editing &&
        hovering && (
          <CiEdit
            onClick={() => {
              setEditing(true);
            }}
          />
        )}
    </div>
  );
};

export default SelectedFunctionDescription;
