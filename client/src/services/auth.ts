import { IUser, LoginResponse, SignUpResponse } from "../types/index";
import axios from "axios";

export const login = async (loginData: IUser): Promise<LoginResponse> => {
  try {
    const { data } = await axios.post("backend/api/login", {
      headers: {
        "Content-Type": "application/json",
      },
      body: loginData,
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        data: null,
        message: error.message,
      };
    } else {
      return {
        data: null,
        message: "An unexpected error occurred",
      };
    }
  }
};

export const signup = async (registerData: IUser): Promise<SignUpResponse> => {
  try {
    const { data } = await axios.post("backend/api/register", {
      headers: {
        "Content-Type": "application/json",
      },
      body: registerData,
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        data: null,
        message: error.message,
      };
    } else {
      return {
        data: null,
        message: "An unexpected error occurred",
      };
    }
  }
};
