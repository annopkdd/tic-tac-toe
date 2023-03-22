import {
  IAnyType,
  OptionalDefaultValueOrFunction,
  types,
  ValidOptionalValues,
} from "mobx-state-tree";

const parseFunction = (value: string) => {
  const fn = eval(`(${value})`);
  if (typeof fn !== "function") {
    throw new Error(`${value} is not a valid function`);
  }
  return fn;
};

const mobxFuncTypes = types.custom<string, Function>({
  name: "mobxFuncTypes",
  fromSnapshot(value: string) {
    return parseFunction(value);
  },
  toSnapshot(value: Function) {
    return value.toString();
  },
  getValidationMessage(value: string) {
    try {
      parseFunction(value);
      return "";
    } catch (e) {
      return `value "${value}" is Not a valid function ${e}`;
    }
  },
  isTargetType(value: any) {
    return value instanceof Function;
  },
});

const optional = <IT extends IAnyType, OptionalVals extends ValidOptionalValues>(
  type: IT,
  defaultValueOrFunction: OptionalDefaultValueOrFunction<IT>,
) => {
  return types.optional(type, defaultValueOrFunction, [undefined, null]);
};

export const customtypes = { mobxFuncTypes, optional };

export const setAllField = (self: any, data: any) => {
  Object.keys(data).forEach((key) => {
    try {
      // @ts-ignore
      self[key] = data[key];
    } catch (e) {
      console.log("key", key);
      throw e;
    }
  });
};
