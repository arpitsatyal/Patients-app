import axios from "axios";
import { getFromLS } from "@/utils/localStorage";

const instance = axios.create({
  baseURL: "http://localhost:4200/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getFromLS("token")}`,
  },
});

export default instance;
