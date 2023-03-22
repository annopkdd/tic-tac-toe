import React from "react";
import { observer } from "mobx-react-lite";
import { IAppModel } from "modules/AppModel";
import { appStoreContext } from "RootStore";
import { CustomModal, Loader } from "@/components/common";

const AppLoadingModal = () => {
  const appStore: IAppModel = React.useContext(appStoreContext);

  return (
    <CustomModal open={appStore.loading}>
      <Loader />
    </CustomModal>
  );
};

export default observer(AppLoadingModal);
