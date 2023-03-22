import React from "react";
import { useAuth, useIsAuthenticated, usePolybase } from "@polybase/react";
import OptionsModal from "../Helpers/OptionsModal";
import { usePopUp } from "../Contexts/PopUpProvider";
import SetNameModal from "./SetNameModal";
const Navbar = () => {
  const { auth, state, loading } = useAuth();
  const [isLoggedIn, authLoading] = useIsAuthenticated();
  const pb = usePolybase();
  const userCollectionRef = pb?.collection("User");
  const { showModal } = usePopUp();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [user, setUser] = React.useState(null);

  const checkIfUserExistsInSchemaOrAdd = async () => {
    try {
      const { data } = await userCollectionRef
        .record(String(state?.userId))
        .get();
      console.log("data", data);
      setUser(data);
    } catch (error) {
      console.log(error);
      // @ts-ignore
      if (error.reason === "record/not-found") {
        const { data } = await userCollectionRef.create([
          String(state?.userId),
        ]);
        if (!data) return;
        await checkIfUserExistsInSchemaOrAdd();
      }
    }
  };

  React.useEffect(() => {
    if (isLoggedIn && state) {
      checkIfUserExistsInSchemaOrAdd();
    }
  }, [isLoggedIn, state]);

  const showSetNameModal = () => {
    showModal({
      component: <SetNameModal />,
    });
  };
  return (
    <div className=" bg-s-bg flex flex-row w-full justify-between px-8 py-3">
      <div></div>
      <div className="self-end">
        {!loading && !authLoading ? (
          <>
            {isLoggedIn ? (
              <div className="centered-row">
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
                  <div className="px-4 py-2 border-p-border border rounded-xl flex flex-col">
                    {user?.userName && <div>{user?.userName}</div>}
                    {state?.type === "email"
                      ? state?.email
                      : `${state?.userId?.slice(0, 6)}...`}
                  </div>
                </OptionsModal>
              </div>
            ) : (
              <button
                className="px-4 py-1 bg-brand  rounded-md"
                onClick={() => auth.signIn()}
              >
                Sign In
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
