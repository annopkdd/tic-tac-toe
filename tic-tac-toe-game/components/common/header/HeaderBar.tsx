import React from "react";
import { Icons } from "@/constants";
import { Image } from "../image";
import { IBaseComponent } from "@/types";
import { combine } from "@/utils";
import { BackIcon } from "../icon";
import { useRouter } from "next/router";

interface IHeaderBar extends IBaseComponent {
  title?: string;
  subTitle?: React.ReactNode;
  onClickBack?: () => void;
  rightComponent?: React.ReactNode;
}

const HeaderBar: React.FC<IHeaderBar> = (props) => {
  const { title, subTitle, onClickBack, rightComponent, className } = props;

  const router = useRouter();

  return (
    <div
      className={combine([
        className,
        "h-[50px] bg-white flex items-center pt-4 mb-8 px-4 shrink-0",
      ])}
    >
      <div className="flex-1">
        <BackIcon
          onClick={() => (onClickBack ? onClickBack() : router.back())}
        />
      </div>

      <div className="flex-[8] flex flex-col items-center">
        {title ? (
          <span className="font-ibm-semibold text-sm">{title}</span>
        ) : null}
        {subTitle ? subTitle : null}
      </div>
      <div className="flex-1 flex flex-row justify-end">
        {rightComponent ? rightComponent : null}
      </div>
    </div>
  );
};

export default HeaderBar;
