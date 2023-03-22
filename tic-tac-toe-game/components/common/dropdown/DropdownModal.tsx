import React from "react";
import { IBaseComponent } from "@/types";
import { combine } from "@/utils";
import { RadioButton, TextInput } from "../input";
import { BottomSheetModal } from "../modal";
import { Icons } from "@/constants";
import { Image } from "../image";

interface IOption {
  label: string;
  value: any;
}

interface IDropdownModal extends IBaseComponent {
  value: any;
  options: IOption[];
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: any) => void;
}

const DropdownModal = (props: IDropdownModal) => {
  const { value, placeholder, options, onChange, disabled, className } = props;

  const [isShowModal, setIsShowModal] = React.useState(false);

  const selectedValue = options.find((o: IOption) => o.value === value);

  return (
    <div className={combine([className, ""])}>
      <TextInput
        placeholder={placeholder}
        value={selectedValue ? selectedValue.label : ""}
        rightComponent={<Image src={Icons.arrowDownIcon} />}
        readOnly
        disabled={disabled}
        onClick={() => setIsShowModal(true)}
        className="cursor-pointer"
      />

      <BottomSheetModal
        title={placeholder}
        open={isShowModal}
        onClose={() => setIsShowModal(false)}
        containerClassName="px-0"
      >
        <div className="flex flex-col">
          {options.map((option: IOption, index: number) => (
            <div
              key={`_optionmodal_${index}`}
              onClick={() => {
                onChange(option);
                setIsShowModal(false);
              }}
              className="flex flex-row p-4 border-b cursor-pointer"
            >
              <RadioButton checked={selectedValue?.value === option.value} />
              <span className="ml-4 text-sm font-medium text-textsecondary">
                {option.label}
              </span>
            </div>
          ))}
        </div>
      </BottomSheetModal>
    </div>
  );
};

export default DropdownModal;
