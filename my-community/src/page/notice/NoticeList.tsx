import React, { useEffect, useState } from "react";
import type { NoticeDTO } from "../../types/Community";
import { communityApi } from "../../api/communityApi";
import { Link, useNavigate } from "react-router-dom";
import "./NoticeList.css";

const NoticeList: React.FC = () => {
  const [notice, setNotice] = useState<NoticeDTO[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    communityApi
      .getList()
      .then((res) => setNotice(res))
      .catch((err) => console.error("목록 로딩 실패", err));
  }, []);

  return (
    <div className="list-container">
      <h2 className="list-title">게시글</h2>

      <table className="board-table">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>no</th>
            <th style={{ width: "30%" }}>제목</th>
            <th style={{ width: "20%" }}>작성자</th>
            <th style={{ width: "30%" }}>작성일</th>
            <th style={{ width: "10%" }}>조회수</th>
          </tr>
        </thead>

        <tbody>
          {notice && notice.length > 0 ? (
            notice.map((n) => (
              <tr key={n.id}>
                <td>{n.id}</td>
                <td>
                  <Link to={`/notice/detail/${n.id}`} className="title-link">
                    {n.title}
                  </Link>
                </td>
                <td>{n.writer}</td>
                <td>{n.regDate ? n.regDate.substring(0, 10) : "-"}</td>
                <td>{n.hit}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>게시글이 존재하지 않습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="btn-area">
        <button onClick={() => navigate("/notice/write")} className="btn-write">
          글쓰기
        </button>
      </div>
    </div>
  );
};

export default NoticeList;
