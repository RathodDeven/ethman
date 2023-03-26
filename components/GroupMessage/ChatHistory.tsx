import { getStampFyiURL } from "@/utils/helper";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { usePushUser } from "../Contexts/PushUserProvider";

const ChatHistory = ({ chatHistory }) => {
  const { user } = usePushUser();
  console.log("chatHistory", chatHistory);
  return (
    <div className="h-full flex flex-col-reverse mb-3">
      {chatHistory.map((chat, id) => {
        return (
          <div key={id} className={clsx("flex flex-row w-full px-2 my-2")}>
            <div className="flex flex-col w-full border border-p-border px-2 py-1 rounded-xl">
              <div className="start-row ">
                <Image
                  src={getStampFyiURL(chat.fromDID.replace("eip155:", ""))}
                  width={30}
                  height={30}
                  className="rounded-full"
                  alt={chat.fromDID.replace("eip155:", "")}
                />
                <div className="flex flex-col w-full">
                  <div className="text-xs text-s-text">
                    {chat.fromDID.replace("eip155:", "")}
                  </div>
                  <div>{chat?.messageContent}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatHistory;
