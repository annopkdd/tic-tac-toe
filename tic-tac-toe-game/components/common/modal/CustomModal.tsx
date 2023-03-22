import { CSSObject } from "@/types";
import React from "react";
import ReactModal from "react-modal";

interface ICustomModal {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const CustomModal: React.FC<ICustomModal> = (props) => {
  const { open, children } = props;

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
      {children}
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
    backgroundColor: "rgba(71, 85, 105, 0.75)",
    zIndex: 3000,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    position: "relative",
    inset: 0,
    border: "none",
    background: "transparent",
  },
};

export default CustomModal;
