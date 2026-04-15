import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import type { Board } from "../types/Board";
import "./BoardDetail.css";

const BoardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [board, setBoard] = useState<Board | null>(null);

  useEffect(() => {
    api
      .get<Board>(`/${id}`)
      .then((res) => setBoard(res.data))
      .catch(console.error);
  }, [id]);

  const handleUpdate = async () => {
    if (!board) {
      return;
    }

    await api.put(`/${id}`, board);
    alert("수정 완료");
    navigate("/");
  };

  const handleDelete = async () => {
    if (!window.confirm("삭제하시겠습니까?")) {
      return;
    }

    await api.delete(`/${id}`);
    alert("삭제 완료");
    navigate("/");
  };

  if (!board) {
    return <div className="detail-page">Loading...</div>;
  }

  return (
    <div className="detail-page">
      <div className="detail-card">
        <h2 className="form-group">게시글 상세</h2>

        <div className="form-group">
          <label>작성자</label>
          <input
            className="input-field"
            value={board.creatorId || ""}
            onChange={(e) => setBoard({ ...board, creatorId: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>제목</label>
          <input
            className="input-field"
            value={board.title}
            onChange={(e) => setBoard({ ...board, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>내용</label>
          <textarea
            className="textarea-field"
            value={board.content}
            onChange={(e) => setBoard({ ...board, content: e.target.value })}
          />
        </div>

        <div className="button-group">
          <button className="btn btn-list" onClick={() => navigate("/")}>
            목록으로
          </button>
          <button className="btn btn-update" onClick={handleUpdate}>
            수정
          </button>
          <button className="btn btn-delete" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
