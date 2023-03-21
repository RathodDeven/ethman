import React from "react";
import { useAuth, useIsAuthenticated } from "@polybase/react";
const Navbar = () => {
  const { auth, state, loading } = useAuth();
  const [isLoggedIn, authLoading] = useIsAuthenticated();
  return (
    <div className=" bg-s-bg flex flex-row w-full justify-between px-8 py-3">
      <div></div>
      <div className="self-end">
        {!loading && !authLoading ? (
          <>
            {isLoggedIn ? (
              <div className="centered-row">
                <div>
                  {state?.type === "email"
                    ? state?.email
                    : `${state?.userId?.slice(0, 6)}...`}
                </div>
                <button
                  className="px-4 py-1 bg-red-400 rounded-md"
                  onClick={() => auth.signOut()}
                >
                  Sign Out
                </button>
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
