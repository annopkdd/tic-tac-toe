import React from "react";
import { combine } from "@/utils";

export interface ITextInput
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  onChangeText?: (value: string) => void;
  required?: boolean;
  floatingLabel?: boolean;
  inputClassName?: string;
  rightComponent?: React.ReactNode;
}

const TextInput: React.FC<ITextInput> = (props) => {
  const {
    value,
    placeholder,
    type,
    onChangeText,
    required,
    floatingLabel,
    inputClassName,
    className,
    rightComponent,
    readOnly,
    disabled,
    onClick,
    ...rest
  } = props;

  return (
    <div
      onClick={onClick}
      className={combine(["relative flex flex-row items-center", className])}
    >
      <input
        placeholder={floatingLabel !== false ? " " : placeholder}
        type={type || "text"}
        value={value}
        readOnly={readOnly}
        disabled={disabled}
        onChange={
          onChangeText
            ? (e: React.ChangeEvent<HTMLInputElement>) =>
                onChangeText(e.target.value)
            : undefined
        }
        className={combine([
          inputClassName,
          floatingLabel !== false ? "pb-1.5 pt-4" : "py-3",
          "block px-2.5 w-full text-sm text-gray-900 bg-transparent disabled:bg-[#EDEDED] rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
        ])}
        {...rest}
      />
      {rightComponent ? (
        <div className="absolute right-[8px]">{rightComponent}</div>
      ) : null}
      {floatingLabel !== false && placeholder !== undefined ? (
        <label
          onClick={(e) => e.preventDefault()}
          className={combine([
            readOnly
              ? ""
              : "peer-focus:top-5 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:px-2 peer-focus:text-blue-600",
            disabled ? "bg-[#EDEDED]" : "bg-white",
            "pointer-events-none absolute text-xs text-textthird duration-300 transform -translate-y-4 scale-75 top-5 z-10 origin-[0] px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 left-1",
          ])}
        >
          {`${placeholder} ${required && value === "" ? "*" : ""}`}
        </label>
      ) : null}
    </div>
  );
};

export default TextInput;
