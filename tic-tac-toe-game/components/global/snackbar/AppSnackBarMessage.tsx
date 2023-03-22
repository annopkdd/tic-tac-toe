import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { IAppModel } from "modules/AppModel";
import { appStoreContext } from "RootStore";
import { observer } from "mobx-react-lite";

import "react-toastify/dist/ReactToastify.css";

const AppSnackBarMessage: React.FunctionComponent = (props) => {
  const appStore: IAppModel = React.useContext(appStoreContext);

  return <ToastContainer bodyClassName="font-ibm-medium" />;
};

export default observer(AppSnackBarMessage);
