export interface MemberDTO {
  userId: string;
  userPw: string;
  userName?: string;
  regDate?: string;
}

export interface NoticeDTO {
  id?: number;
  title: string;
  content: string;
  writer: string;
  regDate?: string;
  hit?: number;
}
