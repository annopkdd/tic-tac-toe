import { request } from "utils";
import { SignInResponse } from "../types";

export const AUTH_ENDPOINT = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth`;

class AuthService {
  public async login(queries: {
    username: string;
    password: string;
  }): Promise<SignInResponse> {
    try {
      const response = await request.post(`${AUTH_ENDPOINT}/login`, {
        queries,
      });

      return response.data;
    } catch (e) {
      throw e;
    }
  }
}

export const authAPI = new AuthService();
