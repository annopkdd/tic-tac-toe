import React from "react";
import { AppModel } from "modules/AppModel";
import { AuthModel } from "modules/auth/model";

export const appStore = AppModel.create({});
export const authStore = AuthModel.create({});

export const appStoreContext = React.createContext(appStore);
export const authStoreContext = React.createContext(authStore);
