import React from "react";
import { Icons } from "@/constants";
import { combine } from "@/utils";
import { Image } from "../image";

interface IRadioButton {
  checked: boolean;
  label?: string;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}

const RadioButton = (props: IRadioButton) => {
  const { checked, label, disabled, onChange } = props;

  return (
    <div className="flex items-center">
      <div
        onClick={() => (onChange ? onChange(!checked) : {})}
        className={combine([
          checked ? "bg-primary border-primary" : "bg-white border-disabled",
          disabled ? "bg-disabled border-disabled" : "",
          "w-[16px] h-[16px] border-2 cursor-pointer rounded-full basis-[16px]",
        ])}
      >
        <Image src={checked ? Icons.whiteCheckedIcon : Icons.greyCheckedIcon} />
      </div>
      {label ? (
        <label className="ml-2 text-sm font-medium text-textsecondary">
          {label}
        </label>
      ) : null}
    </div>
  );
};

export default RadioButton;
