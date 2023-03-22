import React from "react";
import { combine } from "@/utils";

interface IButton {
  title?: string;
  titleClassName?: string;
  color?: "primary" | "success" | "warning" | "failure" | string;
  disabled?: boolean;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const Button: React.FC<IButton> = (props) => {
  const {
    title,
    titleClassName,
    color,
    disabled,
    leftComponent,
    rightComponent,
    onClick,
    children,
    className,
    ...rest
  } = props;

  const handleOnClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  let bgColorClassName = "bg-primary";

  if (disabled) {
    bgColorClassName = "bg-disabled";
  } else {
    if (color === "success") {
      bgColorClassName = "bg-success";
    } else if (color === "warning") {
      bgColorClassName = "bg-warning";
    } else if (color === "failure") {
      bgColorClassName = "bg-failure";
    } else if (color) {
      bgColorClassName = `bg-${color}`;
    }
  }

  return (
    <div
      onClick={handleOnClick}
      className={combine([
        className,
        bgColorClassName,
        "hover:opacity-80 flex flex-row justify-center items-center px-4 py-3 rounded-lg cursor-pointer",
        disabled ? "cursor-not-allowed hover:opacity-100" : "",
      ])}
      {...rest}
    >
      {leftComponent ? leftComponent : null}
      {title ? (
        <span
          className={combine([titleClassName, "text-white font-ibm-semibold"])}
        >
          {title}
        </span>
      ) : null}
      {rightComponent ? rightComponent : null}
      {children}
    </div>
  );
};

export default Button;
