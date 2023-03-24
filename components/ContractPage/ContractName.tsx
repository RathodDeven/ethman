import { ContractType } from "@/types/contract";
import { useAuth, usePolybase, useRecord } from "@polybase/react";
import clsx from "clsx";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { TiTick } from "react-icons/ti";
import { useNotify } from "../Contexts/NotifyProvider";
import { UserType } from "../LayoutPage/Navbar";

const ContractName = ({ contract }: { contract: ContractType }) => {
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
      const newName = inputRef.current?.value;
      await pb
        .collection("Contract")
        .record(contract.id)
        .call("setName", [newName]);
      notifySuccess("Name set successfully");
    } catch (error) {
      notifyError(`Something went wrong | ${error.message}`);
    } finally {
      setEditing(false);
    }
  };

  return (
    <div
      className="start-row"
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => {
        setHovering(false);
      }}
    >
      {editing ? (
        <div className="start-row">
          <input
            type="text"
            ref={inputRef}
            className="text-xl font-semibold outline-none"
            defaultValue={contract.name}
          />
          <TiTick className="w-6 h-6 ml-2" onClick={handleEdit} />
        </div>
      ) : (
        <div className="text-xl font-semibold">{contract.name}</div>
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

export default ContractName;
