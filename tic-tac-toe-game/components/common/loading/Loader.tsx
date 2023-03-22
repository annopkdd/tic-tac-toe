import { Icons } from "@/constants";
import React from "react";
import { Image } from "../image";

interface ILoader {
  size?: number;
}

const Loader: React.FC<ILoader> = (props) => {
  const { size } = props;

  return (
    <Image
      src={Icons.spinner}
      width={size || 35}
      height={size || 35}
      className="inline"
    />
  );
};

export default Loader;
