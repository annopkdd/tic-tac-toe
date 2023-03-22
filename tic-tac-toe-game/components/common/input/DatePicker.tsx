import React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextInput, { ITextInput } from "./TextInput";

interface IDatePicker extends ITextInput {
  date: Dayjs | null;
  onChangeDate: (date: Dayjs) => void;
}

const DatePicker: React.FC<IDatePicker> = (props) => {
  const { date, onChangeDate, ...rest } = props;

  const formatDate = date ? date.format("YYYY-MM-DD") : "";

  return (
    <TextInput
      type={"date"}
      value={formatDate}
      onChangeText={(value: string) =>
        onChangeDate ? onChangeDate(dayjs(value, "YYYY/MM/DD")) : {}
      }
      {...rest}
    />
  );
};

export default DatePicker;
