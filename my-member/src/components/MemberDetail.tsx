import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Member } from "../types/Member";
import { memberApi } from "../api/memberApi";
import "./MemberDetail.css";

const MemberDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    if (id) {
      memberApi.detail(id).then((data) => {
        // 1. 여기서 데이터 구조를 눈으로 직접 확인한다!
        console.log("서버가 준 데이터 전체:", data);

        // 2. 만약 data.id 가 안 보이고 data.data.id 가 보인다면?
        // setMember(data.data); 로 수정해야 함!
        setMember(data);
      });
    }
  }, [id]);

  const handleUpdate = async () => {
    if (member) {
      const { name, gender, birth, mail, phone, address } = member;
      const checkList = [name, gender, birth, mail, phone, address];

      const isAllFilled = checkList.every((value) => {
        // every: "배열에 든 놈들 다 데려와! 한 명이라도 탈락하면 false"
        if (typeof value === "string") {
          return value.trim() !== "";
        }
        return value !== null && value != undefined;
      });

      if (!isAllFilled) {
        return alert("모든 항목을 올바르게 입력해 주세요.");
      }

      await memberApi.update(member);
      alert("수정이 완료되었습니다.");
      navigate("/");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("정말로 삭제하시겠습니까?")) {
      return;
    }

    if (member?.id) {
      await memberApi.delete(member.id);
      alert("삭제가 완료되었습니다.");
      navigate("/");
    } else {
      alert("존재하지 않는 아이디입니다.");
    }
  };

  if (!member) {
    return <div>데이터를 불러오는 중입니다.</div>;
  }

  return (
    <div className="detail-container">
      <div className="detail-card">
        <h2 className="detail-title">회원 상세 보기</h2>
        <div className="detail-form">
          <label>아이디</label>
          <input
            value={member.id || ""}
            onChange={(e) => setMember({ ...member, id: e.target.value })}
            readOnly
            required
            type="text"
          />
        </div>

        <div>
          <label>이름</label>
          <input
            onChange={(e) => setMember({ ...member, name: e.target.value })}
            value={member.name || ""}
            required
            type="text"
          />
        </div>

        <div className="gender-group">
          <label className="gender-label">
            <span>남자</span>
            <input
              type="radio"
              name="gender"
              value="M"
              checked={member.gender === "M"}
              onChange={() => setMember({ ...member, gender: "M" })}
            />
          </label>
          <label className="gender-label">
            <span>여자</span>
            <input
              type="radio"
              name="gender"
              value="F"
              checked={member.gender === "F"}
              onChange={() => setMember({ ...member, gender: "F" })}
            />
          </label>
        </div>

        <div>
          <label>생년월일</label>
          <input
            value={member.birth?.substring(0, 10) || ""}
            onChange={(e) => setMember({ ...member, birth: e.target.value })}
            type="date"
            required
          />
        </div>

        <div>
          <label>이메일</label>
          <input
            value={member.mail || ""}
            onChange={(e) => setMember({ ...member, mail: e.target.value })}
            required
            type="email"
          />
        </div>

        <div>
          <label>전화번호</label>
          <input
            value={member.phone || ""}
            onChange={(e) => setMember({ ...member, phone: e.target.value })}
            required
            type="tel"
          />
        </div>

        <div>
          <label>주소</label>
          <input
            value={member.address || ""}
            onChange={(e) => setMember({ ...member, address: e.target.value })}
            required
            type="text"
          />
        </div>

        <div>
          <label>가입일</label>
          <input
            value={member.registDay || ""}
            onChange={(e) =>
              setMember({ ...member, registDay: e.target.value })
            }
            required
            type="text"
            readOnly
          />
        </div>
        <div className="btn btn-group">
          <button onClick={() => navigate("/")} className="go-list">
            목록으로
          </button>
          <button onClick={handleUpdate} className="go-update">
            수정 완료
          </button>
          <button onClick={handleDelete} className="go-delete">
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;
