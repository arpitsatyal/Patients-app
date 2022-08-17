import axios from "axios";
import { IPatient } from "./../types/patients";
import { IPatientResponse } from "../types/patients";
import getAccessToken from "@/utils/accessToken";

export const getAll = async (): Promise<IPatientResponse[]> => {
  try {
    const { data } = await axios.get("backend/api/patients", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return data.data;
  } catch (error: any) {
    throw new Error("something went wrong");
  }
};

export const create = async (body: IPatient): Promise<IPatientResponse> => {
  try {
    const { data } = await axios.post(
      "backend/api/patients",
      {
      body,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    throw new Error("something went wrong");
  }
};
