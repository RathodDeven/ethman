import clsx from "clsx";
import React from "react";
import { useEffect, useRef } from "react";

/* eslint-disable */

const OptionsModal = ({
  children,
  OptionsPopUpModal,
  showModal,
  setShowModal,
  position,
  beforeButtonClick,
}: {
  children: React.ReactNode;
  OptionsPopUpModal: React.ReactNode;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  position?: "left" | "right";
  beforeButtonClick?: (callback: () => void) => void;
}) => {
  const popupRef = useRef(null);

  const handleClick = (e) => {
    if (
      popupRef.current &&
      // @ts-ignore
      (!e.target?.id || popupRef.current?.id !== e.target.id) &&
      // @ts-ignore
      !popupRef.current?.contains(e.target)
    ) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [popupRef]);

  const handleButtonClick = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="relative" ref={popupRef}>
      <div
        className="relative cursor-pointer"
        onClick={() => {
          if (beforeButtonClick) {
            beforeButtonClick(handleButtonClick);
          } else {
            handleButtonClick();
          }
        }}
        id="options-wrapper"
      >
        {children}
      </div>
      {showModal && (
        <div
          className={clsx(
            `absolute min-w-[150px]
            z-40 bg-s-bg p-2 rounded-xl top-auto border-p-border border shadow-lg`,
            position === "left" && "left-0",
            position === "right" && "right-0",
            !position && "right-0"
          )}
        >
          {OptionsPopUpModal}
        </div>
      )}
    </div>
  );
};

export default OptionsModal;
