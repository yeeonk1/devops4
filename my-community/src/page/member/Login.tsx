import type React from "react";
import { communityApi } from "../../api/communityApi";
import type { MemberDTO } from "../../types/Community";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";

const Login: React.FC = () => {
  const [form, setForm] = useState<Partial<MemberDTO>>({
    userId: "",
    userPw: "",
  });
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await communityApi.login(form as MemberDTO);
      sessionStorage.setItem("user", JSON.stringify(res.data));
      alert(`${res.data.userName || res.data.userId}님, 환영합니다!`);
      navigate("/notice/list");
    } catch (error: any) {
      console.error("로그인 에러: ", error);
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className="list-container">
      <h2 className="list-title">로그인</h2>
      <form onSubmit={handleLogin} className="write-form">
        <div className="write-group">
          <label className="write-label">아이디</label>
          <input
            className="write-input"
            type="text"
            value={form.userId}
            onChange={(e) => setForm({ ...form, userId: e.target.value })}
            placeholder="아이디를 입력하세요"
            required
          />
        </div>

        <div className="write-group">
          <label className="write-label">비밀번호</label>
          <input
            className="write-input"
            type="password"
            value={form.userPw}
            onChange={(e) => setForm({ ...form, userPw: e.target.value })}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>

        <div className="btn-area">
          <button className="btn-write" type="submit">
            로그인하기
          </button>
          <button
            className="btn-list"
            type="button"
            onClick={() => navigate("/join")}
          >
            회원가입
          </button>
        </div>
      </form>

      <div>
        <Link
          to="/"
          style={{ color: "#666", textDecoration: "none", fontSize: "0.9rem" }}
        >
          <button className="btn-list">메인페이지로 돌아가기</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
