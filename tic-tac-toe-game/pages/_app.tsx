import React from "react";
import { observer } from "mobx-react-lite";
import { AppLoadingModal, AppSnackBarMessage } from "@/components/global";
import { BottomNavigationLayout } from "@/components/layouts";
import "@/styles/globals.css";

const App = ({ Component, pageProps }: any) => {
  const Layout = Component.Layout || BottomNavigationLayout;

  return (
    <Layout>
      <Component {...pageProps} />
      <AppLoadingModal />
      <AppSnackBarMessage />
    </Layout>
  );
};

export default observer(App);
