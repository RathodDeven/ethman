import React, { createContext, useContext, useState } from "react";

interface ModalType {
  component: React.ReactNode;
}

interface ContextType {
  showModal: ({ component }: ModalType) => void;
  hideModal: () => void;
}

export const CustomPopUpModalContext = createContext<ContextType>({
  showModal: () => {},
  hideModal: () => {},
});

const PopUpProvider = ({ children }) => {
  const [modals, setModals] = useState<ModalType[]>([]);
  const providerVal = {
    showModal: (modal: ModalType) => {
      setModals((prev) => [...prev, modal]);
    },
    hideModal: () => {
      setModals((prev) => {
        prev.pop();
        return [...prev];
      });
    },
  };
  return (
    <CustomPopUpModalContext.Provider value={providerVal}>
      <>
        {modals.map((modal, i) => (
          <div
            key={i}
            className="flex flex-row justify-center items-center fixed z-50 no-scrollbar w-full h-full"
          >
            <div className="flex justify-center items-center relative w-full h-full">
              <div
                className={`w-full h-full absolute
                  bg-black/40 backdrop-opacity-40  backdrop-blur-sm
                z-0`}
                onClick={providerVal.hideModal}
              ></div>
              <div
                className={`flex overflow-y-auto no-scrollbar relative`}
                style={{ zIndex: 1 }}
              >
                {modal.component}
              </div>
            </div>
          </div>
        ))}
        {children}
      </>
    </CustomPopUpModalContext.Provider>
  );
};

export default PopUpProvider;
export const usePopUp = () => useContext(CustomPopUpModalContext);
