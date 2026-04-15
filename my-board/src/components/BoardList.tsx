import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";
import type { Board } from "../types/Board";
import "./BoardList.css";

const BoardList: React.FC = () => {
  const [list, setList] = useState<Board[]>([]);
  useEffect(() => {
    api
      .get<Board[]>("")
      .then((res) => setList(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="list-container">
      <h2 className="list-title">게시글 목록</h2>
      <table className="board-table">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>번호</th>
            <th style={{ width: "70%" }}>제목</th>
            <th style={{ width: "20%" }}>조회수</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 ? (
            list.map((board) => (
              <tr key={board.boardId}>
                <td>{board.boardId}</td>
                <td style={{ textAlign: "left" }}>
                  <Link className="title-link" to={`/board/${board.boardId}`}>
                    {board.title}
                  </Link>
                </td>
                <td>{board.hitCnt}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>게시글이 존재하지 않습니다.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="btn-area">
        <Link to={"/write"}>
          <button className="btn-write">글쓰기</button>
        </Link>
      </div>
    </div>
  );
};

export default BoardList;
