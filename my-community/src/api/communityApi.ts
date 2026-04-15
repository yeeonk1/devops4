import axios from "axios";
import type { NoticeDTO, MemberDTO } from "../types/Community";

const instance = axios.create({
  baseURL: "/api",
  withCredentials: true, // 세션 공유
});

export const communityApi = {
  // member
  login: (data: MemberDTO) => instance.post("/member/login", data),

  join: (data: MemberDTO) => instance.post("/member/join", data),

  logout: () => instance.get("/member/logout"),

  idCheck: (userId: string) =>
    instance
      .get<number>(`/member/idCheck?userId=${userId}`)
      .then((res) => res.data),

  // notice
  getList: () =>
    instance.get<NoticeDTO[]>("/notice/list").then((res) => res.data),

  write: (data: Partial<NoticeDTO>) => instance.post("/notice/write", data),

  getDetail: (id: number) =>
    instance.get<NoticeDTO>(`/notice/detail/${id}`).then((res) => res.data),

  update: (data: NoticeDTO) => instance.put("/notice/update", data),

  delete: (id: number) => instance.delete(`/notice/delete/${id}`),
};

export const noticeApi = {};
