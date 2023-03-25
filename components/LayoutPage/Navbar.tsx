import React from "react";
import {
  useAuth,
  useDocument,
  useIsAuthenticated,
  usePolybase,
} from "@polybase/react";
import OptionsModal from "../Helpers/OptionsModal";
import { usePopUp } from "../Contexts/PopUpProvider";
import SetNameModal from "./SetNameModal";
import { PublicKey } from "@polybase/client";
import clsx from "clsx";
import Image from "next/image";
import AddContractButton from "../AddContractButton/AddContractButton";
import { getStampFyiURL } from "@/utils/helper";

export interface UserType {
  id: string;
  publicKey: PublicKey;
  userName?: string;
}

const Navbar = () => {
  const { auth, state, loading } = useAuth();
  const [isLoggedIn, authLoading] = useIsAuthenticated();
  const pb = usePolybase();
  const { showModal } = usePopUp();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const { data } = useDocument<UserType>(
    pb.collection("User").record(String(state?.userId))
  );

  const createUser = async () => {
    await pb.collection("User").create([String(state?.userId)]);
  };

  const showSetNameModal = () => {
    showModal({
      component: <SetNameModal user={data?.data} />,
    });
  };
  return (
    <div className=" bg-s-bg flex flex-row w-full justify-between px-8 py-2">
      <div className="centered-row">
        <Image
          src={"/EthmanLogo512x512.png"}
          className="rounded-xl"
          width={40}
          height={40}
          alt="Ethman Logo"
        />
        <div className="text-xl font-bold ml-2">Ethman</div>
      </div>
      <div className="self-end">
        {!loading && !authLoading ? (
          <>
            {isLoggedIn ? (
              <>
                {data?.data ? (
                  <div className="centered-row">
                    <div>
                      <AddContractButton />
                    </div>
                    <OptionsModal
                      OptionsPopUpModal={
                        <div className="flex flex-col space-y-2 w-[150px]">
                          <button
                            onClick={showSetNameModal}
                            className="px-4 py-1 bg-s-bg rounded-md hover:bg-p-bg"
                          >
                            Set Username
                          </button>
                          <button
                            className="px-4 py-1 bg-red-400 rounded-md"
                            onClick={() => auth.signOut()}
                          >
                            Sign Out
                          </button>
                        </div>
                      }
                      setShowModal={setOpenModal}
                      showModal={openModal}
                      position="right"
                    >
                      <div className="pl-2 pr-4 py-1 border-p-border border rounded-xl start-row">
                        <div>
                          <Image
                            src={getStampFyiURL(state?.userId)}
                            width={35}
                            height={35}
                            alt={state?.userId}
                            className="rounded-full"
                          />
                        </div>
                        <div className="flex flex-col">
                          {data?.data?.userName && (
                            <div className="text-sm">
                              {data?.data?.userName}
                            </div>
                          )}
                          <div
                            className={clsx(
                              data?.data?.userName && "text-xs text-s-text"
                            )}
                          >
                            {state?.type === "email"
                              ? state?.email
                              : `${state?.userId?.slice(0, 6)}...`}
                          </div>
                        </div>
                      </div>
                    </OptionsModal>
                  </div>
                ) : (
                  <button
                    className="px-4 py-1 bg-brand  rounded-md"
                    onClick={createUser}
                  >
                    Sign In
                  </button>
                )}
              </>
            ) : (
              <button
                className="px-4 py-1 bg-brand  rounded-md"
                onClick={() => auth.signIn()}
              >
                Connect
              </button>
            )}
          </>
        ) : (
          <div className="animate-spin" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
