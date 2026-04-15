import api from "./axios";
import type {
  boardDTO,
  BoardListResponse,
  Criteria,
  memberDTO,
  MemberResponse,
} from "../types/Community";

export const boardApi = {
  getList: (cri: Criteria) =>
    api.get<BoardListResponse>("/board/list", { params: cri }),

  getDetail: (id: number) => api.get<boardDTO>(`/board/detail/${id}`),

  insert: (formdata: FormData) => api.post("/board/insert", formdata),

  update: (formdata: FormData) => api.put("/board/update", formdata),

  delete: (id: number) => api.delete(`/board/delete/${id}`),

  deleteFile: (fileIdx: number) => api.delete(`/board/deleteFile/${fileIdx}`),
};

export const memberApi = {
  join: (data: memberDTO) => api.post<MemberResponse>("/member/join", data),

  login: (data: memberDTO) =>
    api.post<MemberResponse>("/member/loginProc", data),

  logout: () => api.post<MemberResponse>("/member/logout"),

  status: () => api.get<MemberResponse>("/member/status"),
};
