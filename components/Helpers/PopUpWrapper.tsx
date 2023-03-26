import React from "react";
import { usePopUp } from "../Contexts/PopUpProvider";
import { AiOutlineClose } from "react-icons/ai";

const PopUpWrapper = ({
  title,
  onClick,
  loading = false,
  label = "Save",
  children,
  isDisabled = false,
  Icon,
}: {
  title: string;
  onClick?: () => void;
  loading?: boolean;
  label?: string;
  children: React.ReactNode;
  isDisabled?: boolean;
  Icon: React.ReactNode;
}) => {
  const { hideModal } = usePopUp();

  return (
    <div className="bg-s-bg sm:rounded-3xl p-4 w-[550px] h-fit max-h-[600px] overflow-hidden text-p-text">
      <div className="flex flex-row justify-between items-center pb-4">
        <div className="centered-row">
          {Icon && <div>{Icon}</div>}
          <div className="text-p-text ml-4 font-semibold">{title}</div>
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
            } centered-row px-5 py-1.5 font-bold uppercase rounded-lg text-base text-p-btn-text mt-3`}
            type="button"
            onClick={onClick}
            disabled={loading || isDisabled}
          >
            {loading && <div className="spinner border-white" />}{" "}
            <div>{label}</div>
          </button>
        </>
      )}
    </div>
  );
};

export default PopUpWrapper;
