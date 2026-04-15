import type React from "react";
import { Link, useNavigate } from "react-router-dom";
import { memberApi } from "../api/communityApi";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const userStr = sessionStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = async () => {
    try {
      await memberApi.logout();
      sessionStorage.removeItem("user");
      alert("로그아웃");
      navigate("/");
    } catch (error) {
      alert("로그아웃 실패");
      console.error("로그아웃 실패: ", error);
    }
  };

  return (
    <div>
      <div>
        <nav>
          <div>
            {user ? (
              <div>
                <span>{user.userName || user.userId}님 환영합니다</span>
                <Link to="/board/list">게시판 보러가기</Link>
                <button type="button" onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            ) : (
              <div>
                <Link to="/member/login">로그인</Link>
                <Link to="/member/join">회원가입</Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
