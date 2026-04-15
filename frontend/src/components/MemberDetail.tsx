import React, { useEffect, useState } from "react";
import { memberApi } from "../api/memberApi";
import type { MemberInfoDTO } from "../types/Member";
import { useParams } from "react-router-dom";
import "./MemberDetail.css";

interface Props {
  onBack: () => void;
}

const MemberDetail: React.FC<Props> = ({ onBack }) => {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<MemberInfoDTO | null>(null);

  const loadDetail = async () => {
    if (!id) return;
    try {
      const res = await memberApi.getDetail(id);
      setDetail(res.data);
    } catch (error) {
      alert("데이터를 불러오는데 실패했습니다.");
      onBack();
    }
  };

  useEffect(() => {
    loadDetail();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (detail) {
      setDetail({ ...detail, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async () => {
    if (!detail) {
      return;
    }

    try {
      const res = await memberApi.update(detail);
      alert(res.data);
    } catch (error) {
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        if (!id) return;
        await memberApi.delete(id);
        alert("삭제되었습니다.");
        onBack();
      } catch (error) {
        alert("삭제 실패");
      }
    }
  };

  if (!detail) return <div className="detail-page">로딩 중...</div>;

  return (
    <div className="detail-page">
      <div className="detail-card">
        <h2>회원 상세 정보</h2>

        <div className="form-group">
          <label>아이디</label>
          <input
            name="id"
            value={detail.id}
            readOnly
            style={{ backgroundColor: "#f1f3f5" }}
          />
        </div>

        <div className="form-group">
          <label>이름</label>
          <input name="name" value={detail.name} onChange={handleChange} />
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>성별</label>
            <select
              name="gender"
              value={detail.gender}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "8px",
                border: "1px solid #dee2e6",
              }}
            >
              <option value={"남"}>남성</option>
              <option value={"여"}>여성</option>
            </select>
          </div>

          <div className="form-group" style={{ flex: 1 }}>
            <label>생년월일</label>
            <input
              name="birth"
              type="date"
              value={detail.birth}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>이메일</label>
          <input
            name="mail"
            type="email"
            value={detail.mail}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>연락처</label>
          <input
            name="phone"
            type="text"
            value={detail.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>주소</label>
          <input
            name="address"
            type="text"
            value={detail.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>가입일</label>
          <input
            value={detail.registDay || ""}
            readOnly
            style={{ backgroundColor: "#f1f3f5" }}
          />
        </div>

        <div className="button-group">
          <button className="btn btn-list" onClick={onBack}>
            목록
          </button>
          <button className="btn btn-delete" onClick={handleDelete}>
            삭제
          </button>
          <button className="btn bnt-update" onClick={handleUpdate}>
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
