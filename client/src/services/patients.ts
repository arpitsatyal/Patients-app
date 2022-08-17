import { PatientResponse } from "../types/patients";
import axios from "axios";

export const getAll = async (): Promise<PatientResponse> => {
  try {
    const { data } = await axios.get("backend/api/patients", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("user") || "{}").accessToken}`
      },
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
