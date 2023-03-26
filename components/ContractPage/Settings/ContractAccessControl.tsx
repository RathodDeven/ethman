import { useNotify } from "@/components/Contexts/NotifyProvider";
// import { usePushUser } from "@/components/Contexts/PushUserProvider";
import { useContractStore } from "@/store/contract";
import { ContractAccessType } from "@/types/contractAccess";
import { randomString } from "@/utils/helper";
import { useCollection, usePolybase } from "@polybase/react";
import React from "react";
import { CiCircleRemove } from "react-icons/ci";
import { GoDiffAdded } from "react-icons/go";
// import * as PushAPI from "@pushprotocol/restapi";
// import { ENV } from "@pushprotocol/uiweb";

const ContractAccessControl = () => {
  const currentContract = useContractStore((state) => state.currentContract);
  const pb = usePolybase();
  const [givingAccess, setGivingAccess] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { notifyError, notifySuccess } = useNotify();
  // const { user, decryptPrivateKey, decryptedPvtKey } = usePushUser();
  // const { state } = useAuth();

  const { data } = useCollection<ContractAccessType>(
    pb
      .collection("ContractAccess")
      .where(
        "contract",
        "==",
        pb.collection("Contract").record(String(currentContract?.id))
      )
  );

  const addAccess = async () => {
    try {
      setGivingAccess(true);
      const id = randomString(10);
      const toAddr = String(inputRef.current?.value).toLowerCase();
      await pb
        .collection("ContractAccess")
        .create([
          id,
          pb.collection("Contract").record(String(currentContract?.id)),
          toAddr,
        ]);
      inputRef.current!.value = "";

      // updating group chat, adding new member to group chat
      // const chatId = currentContract?.groupChatId;
      // if (chatId) {
      //   const groupDetails = await PushAPI.chat.getGroup({
      //     chatId: chatId,
      //   });

      //   console.log("groupDetails", groupDetails);

      //   const response = await PushAPI.chat.updateGroup({
      //     chatId: chatId,
      //     admins: [
      //       ...groupDetails.members.map((m) => {
      //         if (m.isAdmin) {
      //           return m.wallet;
      //         }
      //       }),
      //       toAddr,
      //     ],
      //     members: [],
      //     groupDescription: groupDetails.groupDescription,
      //     groupImage: groupDetails.groupImage,
      //     groupName: groupDetails.groupName,
      //     account: state?.userId,
      //     env: ENV.STAGING,
      //     pgpPrivateKey: decryptedPvtKey,
      //   });

      //   console.log(response);
      //   notifySuccess("Added to contract group chat");
      // }

      notifySuccess("Access given successfully");
    } catch (error) {
      notifyError(`Something went wrong | ${error.message}`);
      console.log(error);
    } finally {
      setGivingAccess(false);
    }
  };

  const removeAccess = async (id: string) => {
    console.log("id to be removed", id);
    try {
      await pb.collection("ContractAccess").record(String(id)).call("del");
      notifySuccess("Access removed successfully");
    } catch (error) {
      notifyError(`Something went wrong | ${error.message}`);
      console.log(error);
    }
  };

  return (
    <div>
      <div className="text-sm text-s-text font-semibold my-2">
        Access Control
      </div>
      {/* input for adding walletaddress to give access to contract */}
      <div className="start-row border border-p-border px-2 py-1 rounded-md">
        <input
          type="text"
          name="walletAddress"
          className="w-full rounded-md outline-none"
          placeholder="Add Wallet Address to give access "
          ref={inputRef}
        />
        {givingAccess ? (
          <div className="w-5 h-5 spinner border-black" />
        ) : (
          <GoDiffAdded onClick={addAccess} className="w-5 h-5 text-p-text" />
        )}
      </div>

      <div className="text-sm text-s-text font-semibold my-2 mt-4">
        Access Give to:{" "}
      </div>
      <div className="flex flex-col px-3">
        {data?.data?.map((accessContract) => (
          <div
            key={accessContract.data.id}
            className="space-between-row px-2 py-1 border border-p-border rounded-md my-1"
          >
            <div className="w-full truncate">
              {accessContract.data.accessUserId}{" "}
            </div>
            <button
              onClick={() => {
                removeAccess(accessContract.data.id);
              }}
            >
              <CiCircleRemove />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractAccessControl;
