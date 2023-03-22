import React from "react";
import { CSSObject } from "@/types";
import { IAuthModel } from "@/modules/auth/model";
import { authStoreContext } from "@/RootStore";

const FullScreenLayout: React.FC<any> = ({ children }) => {
  const authStore: IAuthModel = React.useContext(authStoreContext);

  React.useEffect(() => {
    // @ts-ignore
    if (window !== undefined) {
      // @ts-ignore
      const vh = window.innerHeight * 0.01;
      // @ts-ignore
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
  });

  return (
    <div className="overflow-hidden" style={styles.container}>
      {children}
    </div>
  );
};

const styles: CSSObject = {
  container: {
    height: "calc(var(--vh, 1vh) * 100)",
  },
};

export default FullScreenLayout;
