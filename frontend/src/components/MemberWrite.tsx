import React, { useState } from "react";
import { memberApi } from "../api/memberApi";
import type { MemberInfoDTO } from "../types/Member";
import "./MemberWrite.css";

interface Props {
  onCancel: () => void;
}

const MemberWrite: React.FC<Props> = ({ onCancel }) => {
  const [form, setForm] = useState<MemberInfoDTO>({
    id: "",
    password: "",
    name: "",
    gender: "남",
    birth: "",
    mail: "",
    phone: "",
    address: "",
    registDay: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("전송데이터:", form);

    try {
      const res = await memberApi.write(form);
      alert("등록 성공" + res.data);
      onCancel();
    } catch (error: any) {
      const serverError = error.response?.data;
      const statusCode = error.response?.status;

      console.error("에러 상태 코드:", statusCode);
      console.error("서버 응답 메시지:", serverError);

      if (statusCode === 500) {
        alert(
          `서버 내부 에러(500): DB 제약 조건(중복 ID)이나 Java 로직 오류입니다.\n상세: ${serverError}`,
        );
      } else if (statusCode === 400) {
        alert("잘못된 요청(400): 데이터 형식이 맞지 않습니다.");
      } else {
        alert("알 수 없는 에러가 발생했습니다.");
      }
    }
  };

  return (
    <div className="write-page">
      <div className="write-card">
        <h2 className="write-title">회원 등록</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "20px" }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>아이디</label>
              <input
                className="write-input"
                name="id"
                value={form.id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>비밀번호</label>
              <input
                className="write-input"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>이름</label>
              <input
                className="write-input"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>성별</label>
              <select
                className="write-input"
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option value={"남"}>남성</option>
                <option value={"여"}>여성</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>생년월일</label>
            <input
              className="write-input"
              name="birth"
              type="date"
              value={form.birth}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>이메일</label>
            <input
              className="write-input"
              name="mail"
              type="email"
              value={form.mail}
              onChange={handleChange}
              placeholder="hong@mail.org"
            />
          </div>

          <div className="form-group">
            <label>연락처</label>
            <input
              className="write-input"
              name="phone"
              type="text"
              value={form.phone}
              onChange={handleChange}
              placeholder="010-0000-0000"
            />
          </div>

          <div className="form-group">
            <label>주소</label>
            <input
              className="write-input"
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="write-button-group">
            <button type="submit" className="btn-submit">
              등록하기
            </button>
            <button type="button" className="btn-cancel" onClick={onCancel}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberWrite;
