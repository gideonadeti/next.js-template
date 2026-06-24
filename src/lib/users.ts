import axios from "axios";
import api from "@/lib/api";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
};

export async function getUsers() {
  try {
    const { data } = await api.get<User[]>("/users");
    return data;
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to fetch users");
    }
    throw error;
  }
}

export async function getUser(id: string) {
  try {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to fetch user");
    }
    throw error;
  }
}
