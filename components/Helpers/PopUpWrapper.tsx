import React from "react";
import { usePopUp } from "../Contexts/PopUpProvider";
import { AiOutlineClose } from "react-icons/ai";

const PopUpWrapper = ({
  title,
  onClick,
  loading = false,
  label,
  children,
  isDisabled = false,
  Icon,
}: {
  title: string;
  onClick: () => void;
  loading?: boolean;
  label: string;
  children: React.ReactNode;
  isDisabled?: boolean;
  Icon: React.ReactNode;
}) => {
  const { hideModal } = usePopUp();

  return (
    <div className="bg-s-bg sm:rounded-3xl py-4 w-screen h-screen sm:w-[550px] sm:h-full sm:max-h-[calc(100vh-50px)] overflow-auto text-p-text z-40">
      <div className="flex flex-row justify-between items-center pb-4 px-4">
        <div className="centered-row">
          {Icon && <div>{Icon}</div>}
          <div className="text-p-text ml-4 text-xl">{title}</div>
        </div>
        <div
          className="cursor-pointer w-8 h-8 text-p-text  hover:bg-s-hover hover:duration-300 flex justify-center items-center rounded-full"
          onClick={hideModal}
        >
          <AiOutlineClose className="w-5 h-5  items-center" />
        </div>
      </div>
      {children}

      {onClick && (
        <>
          <button
            className={`text-p-btn-text ${
              isDisabled ? "bg-p-btn-disabled" : "bg-p-btn"
            } centered-row px-3 py-1 font-bold uppercase rounded-full text-base text-p-btn-text`}
            type="button"
            onClick={onClick}
            disabled={loading || isDisabled}
          >
            {loading && <div className="animate-spin" />} <div>{label}</div>
          </button>
        </>
      )}
    </div>
  );
};

export default PopUpWrapper;
