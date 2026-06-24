import api from "@/lib/api";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
};

export async function getUsers() {
  const { data } = await api.get<User[]>("/users");
  return data;
}

export async function getUser(id: string) {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
}
