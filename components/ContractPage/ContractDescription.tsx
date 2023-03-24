import { ContractType } from "@/types/contract";
import { useAuth, usePolybase, useRecord } from "@polybase/react";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { TiTick } from "react-icons/ti";
import { useNotify } from "../Contexts/NotifyProvider";
import { UserType } from "../LayoutPage/Navbar";

const ContractDescription = ({ contract }: { contract: ContractType }) => {
  const [editing, setEditing] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { state } = useAuth();
  const pb = usePolybase();
  const { notifyError, notifySuccess } = useNotify();
  const { data } = useRecord<UserType>(
    pb.collection("User").record(String(state?.userId))
  );
  const [hovering, setHovering] = React.useState(false);

  const handleEdit = async () => {
    try {
      const newDescription = inputRef.current?.value;
      await pb
        .collection("Contract")
        .record(contract.id)
        .call("setDescription", [newDescription]);
      notifySuccess("Name set successfully");
    } catch (error) {
      notifyError(`Something went wrong | ${error.message}`);
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
      className="start-row text-sm text-s-text"
    >
      {editing ? (
        <div className="start-row">
          <input
            type="text"
            ref={inputRef}
            className="text-xs font-semibold outline-none"
            placeholder="Add Description"
            defaultValue={contract.description}
          />
          <TiTick className="w-4 h-4 ml-2" onClick={handleEdit} />
        </div>
      ) : (
        <>
          {contract?.description ? (
            <div className="text-sm font-semibold">{contract.description}</div>
          ) : (
            <div
              className="text-sm text-s-text"
              onClick={() => {
                setEditing(true);
              }}
            >
              Add Description
            </div>
          )}
        </>
      )}
      {String(contract?.creatorPublicKey) === String(data?.data?.publicKey) &&
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

export default ContractDescription;
