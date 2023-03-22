import React from "react";
import { IBaseComponent } from "@/types";
import Select, { MenuPlacement, SingleValue } from "react-select";

export interface IOption {
  label: string;
  value: any;
}

export interface IDropdown extends IBaseComponent {
  value: any;
  options: IOption[];
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: any) => void;
  menuPlacement?: MenuPlacement;
}

const Dropdown = (props: IDropdown) => {
  const { value, options, onChange, disabled, ...rest } = props;

  const handleOnChange = (selectedValue: SingleValue<any>) => {
    if (onChange) {
      onChange(selectedValue);
    }
  };

  const selectedValue = options.find((o: IOption) => o.value === value);

  return (
    <Select
      instanceId={"custom-dropdown"}
      value={selectedValue}
      isSearchable={false}
      onChange={handleOnChange}
      options={options}
      styles={{
        // @ts-ignore
        indicatorSeparator: () => {}, // removes the "stick"
        control: (base) => ({
          ...base,
          borderRadius: "8px !important",
          height: 42,
        }),
        placeholder: (base) => ({
          ...base,
          fontFamily: "IBMPlexSansThai-Regular",
          fontSize: 12,
          color: "#aeaeae",
        }),
      }}
      isDisabled={disabled}
      {...rest}
    />
  );
};

export default Dropdown;
