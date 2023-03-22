import dayjs from "dayjs";

export const dateStringtoDayjs = (dateString: string) => {
  return dayjs(dateString, "DD/MM/YYYY");
};
