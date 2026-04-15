import axios from "axios";
import type { Member } from "../types/Member";

const api = axios.create({
  baseURL: "/api/member",
  headers: {
    "Content-Type": "application/json",
  },
});

export const memberApi = {
  list: () => api.get<Member[]>("/list").then((res) => res.data),
  write: (data: Member) =>
    api.post<string>("/write", data).then((res) => res.data),
  detail: (id: string) =>
    api.get<Member>(`/detail/${id}`).then((res) => res.data),
  update: (data: Member) =>
    api.put<Member>(`/update/${data.id}`).then((res) => res.data),
  delete: (id: string) =>
    api.delete<string>(`/delete/${id}`).then((res) => res.data),
};
