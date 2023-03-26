import { useContractStore } from "@/store/contract";
import React from "react";
// import { usePushUser } from "../Contexts/PushUserProvider";
import GroupMessagesAndComposer from "./GroupMessagesAndComposer";
// import * as PushAPI from "@pushprotocol/restapi";
// import { useAuth, useCollection, usePolybase } from "@polybase/react";
// import { ContractAccessType } from "@/types/contractAccess";
// import { getStampFyiURL } from "@/utils/helper";
// import { ethers } from "ethers";
// import { useNotify } from "../Contexts/NotifyProvider";

const GroupMessageSidebar = () => {
  const currentContract = useContractStore((state) => state.currentContract);
  //   console.log(currentContract?.groupChatId);
  //   const { state } = useAuth();
  //   const pb = usePolybase();
  //   const { user, decryptPrivateKey, decryptedPvtKey } = usePushUser();
  //   console.log(user);
  //   const { notifyError, notifySuccess } = useNotify();

  //   const { data } = useCollection<ContractAccessType>(
  //     pb
  //       .collection("ContractAccess")
  //       .where(
  //         "contract",
  //         "==",
  //         pb.collection("Contract").record(String(currentContract?.id))
  //       )
  //   );

  //   const createCurrentContractGroupChat = async () => {
  //     try {
  //       // @ts-ignore
  //       //   const provider = new ethers.providers.Web3Provider(window?.ethereum);
  //       let pgpDecryptedPvtKey = decryptedPvtKey;
  //       if (!pgpDecryptedPvtKey) {
  //         pgpDecryptedPvtKey = await decryptPrivateKey();
  //       }

  //       const response = await PushAPI.chat.createGroup({
  //         groupName: currentContract?.name,
  //         admins: [],
  //         members: [
  //           ...data?.data?.map(
  //             (accessContract) => accessContract.data.accessUserId
  //           ),
  //         ],
  //         groupDescription: currentContract?.description || "",
  //         groupImage: getStampFyiURL(state?.userId),
  //         isPublic: true,
  //         account: state?.userId,
  //         pgpPrivateKey: pgpDecryptedPvtKey,
  //       });
  //       console.log(response);

  //       const groupChatId = response?.chatId;
  //       await pb
  //         .collection("Contract")
  //         .record(String(currentContract?.id))
  //         .call("setGroupChatId", [groupChatId]);
  //     } catch (err) {
  //       notifyError(`Something went wrong | ${err.message}`);

  //       console.log(err);
  //     } finally {
  //       console.log("finally");
  //     }
  //   };

  if (!currentContract) return null;
  return (
    <div className="relative border border-p-border flex flex-col rounded-xl p-3 bg-s-bg w-[400px] h-full">
      {/* {currentContract?.groupChatId && (
        <GroupMessagesAndComposer chatId={currentContract?.groupChatId} />
      )} */}
      <GroupMessagesAndComposer />
    </div>
  );
};

export default GroupMessageSidebar;
