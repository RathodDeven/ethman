import React, { useState } from "react";
import ChatComposer from "./ChatComposer";
import ChatHistory from "./ChatHistory";
import * as PushAPI from "@pushprotocol/restapi";
import { usePushUser } from "../Contexts/PushUserProvider";
import { useNotify } from "../Contexts/NotifyProvider";
import { useContractStore } from "@/store/contract";

const GroupMessagesAndComposer = () => {
  const { decryptedPvtKey, decryptPrivateKey, user } = usePushUser();
  const [chatHistory, setChatHistory] = useState([]);
  const { notifyError } = useNotify();
  const currentContract = useContractStore((state) => state.currentContract);

  const fetchAndSetChatHistory = async () => {
    try {
      let pgpDecryptedPvtKey = decryptedPvtKey;
      if (!pgpDecryptedPvtKey) {
        pgpDecryptedPvtKey = await decryptPrivateKey();
      }
      const conversationHash = await PushAPI.chat.conversationHash({
        account: user?.did,
        conversationId: `eip155:${currentContract?.creatorAddress}`,
      });

      console.log("conversationHash", conversationHash);

      // @ts-ignore
      if (!conversationHash?.threadHash) {
        setChatHistory([]);
        return;
      }

      const chatHistory = await PushAPI.chat.history({
        // @ts-ignore
        threadhash: conversationHash?.threadHash,
        account: user?.did,
        limit: 30,
        pgpPrivateKey: pgpDecryptedPvtKey,
        toDecrypt: true,
      });

      setChatHistory(chatHistory);
    } catch (error) {
      console.log(error);
      notifyError(error);
    }
  };

  React.useEffect(() => {
    fetchAndSetChatHistory();
  }, [user?.did, currentContract?.creatorAddress]);

  return (
    <div className="flex flex-col h-full">
      <div className="text-xl font-semibold">Chat with Creator</div>
      <div className="flex flex-col h-full">
        <ChatHistory chatHistory={chatHistory} />

        <ChatComposer
          fetchAndSetChatHistory={fetchAndSetChatHistory}
          //   chatId={chatId}
        />
      </div>
    </div>
  );
};

export default GroupMessagesAndComposer;
