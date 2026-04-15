import axios, { AxiosError } from "axios";
import type { MemberInfoDTO } from "../types/Member";

const api = axios.create({
  baseURL: "http://localhost:8080/api/member",
  headers: { "Content-Type": "application/json" },
});

export const memberApi = {
  getList: () => api.get<MemberInfoDTO[]>("/list"),
  getDetail: (id: string) => api.get<MemberInfoDTO>(`/detail/${id}`),
  write: async (member: MemberInfoDTO) => {
    try {
      return await api.post<string>("/write", member);
    } catch (error) {
      const err = error as AxiosError;
      console.error(
        "[API Error] 회원 등록 중 오류 :",
        err.response?.data || err.message,
      );
      throw error;
    }
  },
  update: (member: MemberInfoDTO) => api.put<string>("/update", member),
  delete: (id: string) => api.delete<string>(`/delete/${id}`),
};
