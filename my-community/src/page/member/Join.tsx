import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { communityApi } from "../../api/communityApi";
import { type MemberDTO } from "../../types/Community";
import "./Join.css";

const Join = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<MemberDTO>({
    userId: "",
    userPw: "",
    userName: "",
  });

  const [isIdChecked, setIsIdChecked] = useState(false);

  const handleIdCheck = async () => {
    if (!form.userId.trim()) {
      return alert("아이디를 입력하세요.");
    }
    try {
      const count = await communityApi.idCheck(form.userId);
      if (count === 0) {
        alert("사용 가능한 아이디입니다.");
        setIsIdChecked(true);
      } else {
        alert("중복된 아이디입니다.");
      }
    } catch (error) {
      alert("중복 확인 중 오류가 발생했습니다.");
    }
  };

  const onJoin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isIdChecked) {
      return alert("아이디 중복 확인을 해주세요.");
    }

    try {
      await communityApi.join(form);
      alert("가입 완료");
      navigate("/login");
    } catch (error) {
      alert("회원가입에 실패하였습니다.");
    }
  };

  return (
    <div className="list-container">
      <h2 className="list-title">회원가입</h2>
      <form
        className="write-form"
        onSubmit={onJoin}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <div className="write-group">
          <label className="write-label">아이디</label>
          <div>
            <input
              className="write-input"
              value={form.userId}
              onChange={(e) => {
                setForm({ ...form, userId: e.target.value });
                setIsIdChecked(false);
              }}
              placeholder="아이디"
              required
            />
            <button className="btn-list" type="button" onClick={handleIdCheck}>
              중복 확인
            </button>
          </div>
        </div>

        <div className="write-group">
          <label className="write-label">비밀번호</label>
          <input
            className="write-input"
            type="password"
            value={form.userPw}
            onChange={(e) => setForm({ ...form, userPw: e.target.value })}
            placeholder="비밀번호"
            required
          />
        </div>

        <div className="write-group">
          <label className="write-label">이름</label>
          <input
            className="write-input"
            value={form.userName}
            onChange={(e) => setForm({ ...form, userName: e.target.value })}
            placeholder="이름"
            required
          />
        </div>
        <button className="btn-write" type="submit">
          가입
        </button>
      </form>
    </div>
  );
};

export default Join;
