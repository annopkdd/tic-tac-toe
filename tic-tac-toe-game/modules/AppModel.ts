import { types } from "mobx-state-tree";
import { toast, TypeOptions } from "react-toastify";
import { customtypes } from "utils";

export const SnackBarModel = types
  .model("SnackBarModel", {
    snackBarMessage: customtypes.optional(types.string, ""),
    snackBarType: customtypes.optional(types.string, ""),
  })
  .views((self) => ({
    //
  }))
  .actions((self) => ({
    showSnackBar: (snackBarMessage: string, snackBarType: TypeOptions) => {
      toast(snackBarMessage, {
        type: snackBarType,
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    },
  }));

export type ISnackBarModel = typeof SnackBarModel.Type;

export const AppModel = types
  .model("AppModel", {
    loading: customtypes.optional(types.boolean, false),
    snackbarMessage: customtypes.optional(SnackBarModel, {}),
  })
  .views((self) => ({
    //
  }))
  .actions((self) => ({
    setLoading: (loading: boolean) => {
      self.loading = loading;
    },
    setField: (fieldName: string, value: any) => {
      // @ts-ignore
      self[fieldName] = value;
    },
  }));

export type IAppModel = typeof AppModel.Type;
