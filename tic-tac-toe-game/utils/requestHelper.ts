import axios, { AxiosRequestConfig, Method } from "axios";
import { authStore } from "../RootStore";

export interface IRequestOptions {
  queries?: any;
  body?: {};
  formBody?: {};
  disabledBearerToken?: boolean;
}
const request = async (
  method: Method,
  endpoint: string,
  options?: IRequestOptions
) => {
  const headers: { [key: string]: string } = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (!options?.disabledBearerToken) {
    headers.Authorization = `Bearer ${authStore.token}`;
  }
  const requestOptions: AxiosRequestConfig = {
    method,
    baseURL: endpoint,
    // @ts-ignore
    headers,
  };

  if (options && options.queries) {
    requestOptions.params = options.queries;
  } else if (options && options.formBody) {
    const formDataBody = new FormData();
    for (let key in options.formBody) {
      // @ts-ignore
      const value = options.formBody[key];
      if (value instanceof Array) {
        value.forEach((element, index) => {
          for (let eleKey in element) {
            formDataBody.append(`${key}[${index}][${eleKey}]`, element[eleKey]);
          }
        });
      } else {
        formDataBody.append(key, value);
      }
    }
    requestOptions.data = formDataBody;
    requestOptions.headers["Content-Type"] = "multipart/form-data";
  } else if (options && options.body) {
    requestOptions.data = options.body;
  }

  try {
    const res = await axios(requestOptions);

    // console.log("res", res);
    return res;
  } catch (e: any) {
    throw e;
  }
};

const get = (endpoint: string, requestOptions?: IRequestOptions) =>
  request("GET", endpoint, requestOptions);
const post = (endpoint: string, requestOptions?: IRequestOptions) =>
  request("POST", endpoint, requestOptions);
const put = (endpoint: string, requestOptions?: IRequestOptions) =>
  request("PUT", endpoint, requestOptions);
const patch = (endpoint: string, requestOptions?: IRequestOptions) =>
  request("PATCH", endpoint, requestOptions);
const remove = (endpoint: string, requestOptions?: IRequestOptions) =>
  request("DELETE", endpoint, requestOptions);
export default { get, post, put, patch, delete: remove };
