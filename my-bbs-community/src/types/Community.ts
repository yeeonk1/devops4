export interface boardDTO {
  boardId: number;
  title: string;
  contents: string;
  hitCnt: number;
  createdDatetime: string;
  creatorId: string;
  updatedDatetime?: string;
  updatorId?: string;
  fileList?: fileDTO[];
}

export interface memberDTO {
  userId: string;
  password?: string;
  userName: string;
  role: string;
}

export interface fileDTO {
  fileIdx: number;
  boardId: number;
  originalFileName: string;
  storedFilePath: string;
  fileSize: string;
  creatorId: string;
}

export interface Criteria {
  pageNum: number;
  amount: number;
  skip?: number;
}

export interface PageResponse {
  startPage: number;
  endPage: number;
  total: number;
  prev: boolean;
  next: boolean;
  cri: Criteria;
}

export interface BoardListResponse {
  list: boardDTO[];
  pageMaker: PageResponse;
}

export interface MemberResponse {
  status: "success" | "error";
  message: string;
  userId?: string;
  isLogin?: boolean;
}
