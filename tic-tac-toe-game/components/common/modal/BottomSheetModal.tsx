import React from "react";
import ReactModal from "react-modal";
import { Icons } from "@/constants";
import { Image } from "../image";
import { CSSObject } from "@/types";
import { combine } from "@/utils";

interface IBottomSheetModal {
  open: boolean;
  title?: string;
  onClose?: () => void;
  children?: React.ReactNode;
  containerClassName?: string;
}

const BottomSheetModal: React.FC<IBottomSheetModal> = (props) => {
  const { open, title, onClose, children, containerClassName } = props;

  return (
    <ReactModal
      isOpen={open}
      closeTimeoutMS={100}
      ariaHideApp={false}
      style={{
        overlay: styles.overlay,
        content: styles.content,
      }}
    >
      <div className={"bg-white w-full rounded-t-2xl"}>
        <div className="flex flex-row items-center p-4">
          <div className="basis-[16px]" />
          <span className="flex-[3] font-ibm-medium text-sm text-center">
            {title}
          </span>
          <Image
            alt="close-icon"
            src={Icons.closeIcon}
            width={16}
            height={16}
            onClick={onClose}
            className="basis-[16px] inline cursor-pointer"
          />
        </div>
        <div className={combine([containerClassName, "px-4 pb-4"])}>
          {children}
        </div>
      </div>
    </ReactModal>
  );
};

const styles: CSSObject = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3000,
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  content: {
    position: "relative",
    inset: 0,
    padding: 0,
    overflow: "visible",
  },
};

export default BottomSheetModal;
