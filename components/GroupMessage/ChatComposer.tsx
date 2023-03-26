import React from "react";
import { BsSendFill } from "react-icons/bs";
import { usePushUser } from "../Contexts/PushUserProvider";
import * as PushAPI from "@pushprotocol/restapi";
import { useNotify } from "../Contexts/NotifyProvider";
import { useContractStore } from "@/store/contract";

const ChatComposer = ({
  fetchAndSetChatHistory,
}: {
  fetchAndSetChatHistory: () => Promise<void>;
}) => {
  const { user, decryptPrivateKey, decryptedPvtKey } = usePushUser();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { notifyError, notifySuccess } = useNotify();
  const [sending, setSending] = React.useState(false);
  const currentContract = useContractStore((state) => state.currentContract);

  const onSendMessage = async () => {
    try {
      setSending(true);
      let pgpDecryptedPvtKey = decryptedPvtKey;
      if (!pgpDecryptedPvtKey) {
        pgpDecryptedPvtKey = await decryptPrivateKey();
      }

      const response = await PushAPI.chat.send({
        messageContent: inputRef.current.value,
        account: user?.did,
        receiverAddress: `eip155:${currentContract?.creatorAddress}`,
        pgpPrivateKey: pgpDecryptedPvtKey,
        messageType: "Text",
      });

      console.log(response);
      inputRef.current.value = "";
      await fetchAndSetChatHistory();
      notifySuccess("Message sent successfully");
    } catch (error) {
      notifyError(error.message);
    } finally {
      setSending(false);
    }
  };
  return (
    <div className="space-between-row py-1 border border-p-border px-2 rounded-xl">
      <input
        type="text"
        placeholder="Send Comment"
        className="w-full outline-none"
        ref={inputRef}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            onSendMessage();
          }
        }}
      />
      <button onClick={onSendMessage} disabled={sending}>
        {sending ? <div className="spinner border-p-text" /> : <BsSendFill />}
      </button>
    </div>
  );
};

export default ChatComposer;
