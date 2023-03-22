import React from "react";
import { Icons } from "@/constants";
import { Image } from "../image";
import { IBaseComponent } from "@/types";
import { combine } from "@/utils";

interface IBackIcon extends IBaseComponent {
  onClick: () => void;
}

const BackIcon: React.FC<IBackIcon> = (props) => {
  const { className, ...rest } = props;

  return (
    <Image
      src={Icons.backIcon}
      width={20}
      height={20}
      className={combine([className, "cursor-pointer"])}
      {...rest}
    />
  );
};

export default BackIcon;
