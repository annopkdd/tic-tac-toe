import React from "react";
import { use100vh } from "react-div-100vh";
import { useRouter } from "next/router";
import { Image } from "../common";
import { Icons } from "@/constants";

interface IBottomNavigationLayout {
  children?: React.ReactNode;
}

const BottombarMenu = (props: {
  active: boolean;
  icon: string;
  title: string;
  to: string;
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(props.to)}
      className="w-[44px] flex flex-col items-center cursor-pointer"
    >
      <Image
        src={props.icon}
        width={20}
        height={20}
        alt="bottom-bar-icon"
        className="mb-1"
      />
      {props.active ? (
        <div className="w-[10px] h-[10px] rounded-full bg-primary mt-[2px]" />
      ) : (
        <span className="text-textsecondary text-xxs">{props.title}</span>
      )}
    </div>
  );
};

const BottomNavigationLayout: React.FC<IBottomNavigationLayout> = (props) => {
  const router = useRouter();
  const height100Vh = use100vh();

  const [routePathName, setRoutePathName] = React.useState("");

  React.useEffect(() => setRoutePathName(router.pathname), [router.pathname]);

  return (
    <div
      className={"flex flex-col overflow-hidden"}
      style={{ height: height100Vh ? height100Vh : 0 }}
    >
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {props.children}
      </div>
      {/* Bottom Bar */}
      <div className="relative bg-white h-[70px] border-t border-t-outline">
        <div className="flex flex-row justify-around mt-[7px] px-1">
          <BottombarMenu
            active={routePathName === "/"}
            icon={
              routePathName === "/"
                ? Icons.bottombarActiveHomeIcon
                : Icons.bottombarInactiveHomeIcon
            }
            title="Home"
            to="/"
          />
          <BottombarMenu
            active={routePathName.includes("/profile")}
            icon={
              routePathName.includes("/profile")
                ? Icons.bottombarActiveProfileIcon
                : Icons.bottombarInactiveProfileIcon
            }
            title="Profile"
            to="/profile"
          />
        </div>
      </div>
    </div>
  );
};

export default BottomNavigationLayout;
