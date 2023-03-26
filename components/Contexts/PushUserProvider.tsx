import { useAuth } from "@polybase/react";
import React, { useEffect } from "react";
import * as PushAPI from "@pushprotocol/restapi";

interface ContextType {
  user: any;
  decryptPrivateKey: () => Promise<string>;
  decryptedPvtKey: string;
  requestedChats: any[];
}

const PushUserContext = React.createContext<ContextType>({
  user: null,
  decryptPrivateKey: () => null,
  decryptedPvtKey: null,
  requestedChats: [],
});

const PushUserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [decryptedPvtKey, setDecryptedPvtKey] = React.useState(null);
  const [requestedChats, setRequestedChats] = React.useState([]);
  const { state } = useAuth();

  const fetchAndSetUser = async () => {
    // @ts-ignore
    if (window.ethereum) {
      try {
        // @ts-ignore
        await window.ethereum.enable();
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const _user = await PushAPI.user.get({
        account: `eip155:${state?.userId}`,
      });

      console.log(_user);

      if (_user) {
        setUser(_user);
      } else {
        const _user = await PushAPI.user.create({
          account: `eip155:${state?.userId}`,
        });
        setUser(_user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequestedChats = async () => {
    try {
      let pgpDecryptedPvtKey = await decryptPrivateKey();
      console.log("pgpDecryptedPvtKey", pgpDecryptedPvtKey);
      console.log("user?.did", user?.did);
      const _requestedChats = await PushAPI.chat.requests({
        account: user?.did,
        toDecrypt: true,
        pgpPrivateKey: pgpDecryptedPvtKey,
      });
      console.log("_requestedChats", _requestedChats);
      setRequestedChats(_requestedChats);
    } catch (error) {
      console.log(error);
    }
  };

  const decryptPrivateKey = async () => {
    try {
      const _pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
        encryptedPGPPrivateKey: user.encryptedPrivateKey,
        account: user?.did,
      });
      setDecryptedPvtKey(_pgpDecryptedPvtKey);
      return _pgpDecryptedPvtKey;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user?.did) return;
    fetchRequestedChats();
  }, [user?.did]);

  useEffect(() => {
    if (!state?.userId) return;
    console.log("state?.userId", state?.userId);
    fetchAndSetUser();
  }, [state?.userId]);

  return (
    <PushUserContext.Provider
      value={{ user, decryptPrivateKey, decryptedPvtKey, requestedChats }}
    >
      {children}
    </PushUserContext.Provider>
  );
};

export const usePushUser = () => React.useContext(PushUserContext);

export default PushUserProvider;
