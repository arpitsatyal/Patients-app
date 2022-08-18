import axios from "axios";
import { IPatient } from "./../types/patients";
import { IPatientResponse } from "../types/patients";
import { getFromLS } from "@/utils/localStorage";

export const getAll = async (): Promise<IPatientResponse[]> => {
  try {
    const { data } = await axios.get("backend/api/patients", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getFromLS("token")}`,
      },
    });
    return data.data;
  } catch (error: any) {
    throw new Error("something went wrong");
  }
};

export const getOne = async (id: number): Promise<IPatientResponse> => {
  try {
    const { data } = await axios.get(`backend/api/patients/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getFromLS("token")}`,
      },
    });
    return data;
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
          Authorization: `Bearer ${getFromLS("token")}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    throw new Error("something went wrong");
  }
};

export const update = async (
  body: IPatient,
  id: number
): Promise<IPatientResponse> => {
  try {
    const { data } = await axios.put(
      `backend/api/patients/${id}`,
      {
        body,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getFromLS("token")}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    throw new Error("something went wrong");
  }
};

export const remove = async (id: number): Promise<IPatientResponse> => {
  try {
    const { data } = await axios.delete(`backend/api/patients/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getFromLS("token")}`,
      },
    });
    return data;
  } catch (error: any) {
    throw new Error("something went wrong");
  }
};

export const markAsSpecial = async (
  body: boolean,
  id: number
): Promise<any> => {
  try {
    const currentUserId = getFromLS("user");
    const { data } = await axios.put(
      `backend/api/patients/mark-as-special/${id}`,
      {
        body: {
          specialAttention: body,
        },
        userId: currentUserId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getFromLS("token")}`,
        },
      }
    );
    return data;
  } catch (error: any) {
    throw new Error("something went wrong");
  }
};
