import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { communityApi } from "../../api/communityApi";
import type { NoticeDTO } from "../../types/Community";
import "./NoticeDetail.css";

const NoticeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<NoticeDTO | null>(null);

  useEffect(() => {
    if (id) {
      communityApi
        .getDetail(Number(id))
        .then((res) => setDetail(res))
        .catch((err) => {
          console.error("데이터 로드 실패: ", err);
          alert("존재하지 않는 게시글입니다.");
          navigate("/notice/list");
        });
    }
  }, [id, navigate]);

  const handleDelete = async () => {
    if (id && window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await communityApi.delete(Number(id));
        alert("삭제되었습니다.");
        navigate("/notice/list");
      } catch (error) {
        console.error("삭제 에러", error);
        alert("삭제 실패: 오류가 발생했습니다.");
      }
    }
  };

  if (!detail) return <div className="detail-container">로딩 중...</div>;

  if (detail) {
    console.log("지금 detail에 들어있는 값:", detail);
  }

  return (
    <div className="detail-container">
      <div className="detail-header">
        <h2 className="detail-title">{detail.title || ""}</h2>
        <div className="detail-meta">
          <span>작성자: {detail.writer || ""}</span>
          <span>조회수: {detail.hit || ""}</span>
          <span>작성일: {detail.regDate?.substring(0, 10) || ""}</span>
        </div>
      </div>
      <div className="detail-content">{detail.content || ""}</div>
      <div className="detail-btns">
        <button className="btn-gray" onClick={() => navigate("/notice/list")}>
          목록
        </button>
        <button
          className="btn-blue"
          onClick={() => navigate(`/notice/update/${id}`)}
        >
          수정
        </button>
        <button className="btn-red" onClick={handleDelete}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default NoticeDetail;
