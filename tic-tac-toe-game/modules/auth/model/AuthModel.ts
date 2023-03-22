import { applySnapshot, flow, Instance, types } from "mobx-state-tree";
import { customtypes } from "utils";
import { authAPI } from "../service/AuthService";
import { SignInResponse } from "../types";

const AuthModelField = {
  username: customtypes.optional(types.string, ""),
  password: customtypes.optional(types.string, ""),
  token: customtypes.optional(types.string, ""),
};

export const AuthModel = types
  .model("AuthModel", AuthModelField)
  .views((self) => ({}))
  .actions((self) => ({
    signIn: flow(function* () {
      try {
        const result: SignInResponse = yield authAPI.login({
          username: self.username,
          password: self.password,
        });
        self.token = result.token;
      } catch (e) {
        throw e;
      } finally {
      }
    }),
    setField: (fieldName: keyof typeof AuthModelField, value: any) => {
      self[fieldName] = value;
    },
    resetAll: () => {
      applySnapshot(self, {});
    },
  }));

export type IAuthModel = Instance<typeof AuthModel>;
