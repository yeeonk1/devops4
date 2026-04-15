import { Link, Outlet, useNavigate } from "react-router-dom";
import { communityApi } from "../api/communityApi";
import "./Layout.css";

const Layout = () => {
  const navigate = useNavigate();
  const userStr = sessionStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = async () => {
    try {
      await communityApi.logout();
      sessionStorage.removeItem("user");
      alert("로그아웃 되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="layout-wrapper">
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/notice/list" className="nav-link">
            공지사항
          </Link>
        </div>
        <div className="nav-right">
          {user ? (
            <>
              <div className="user-info">
                <span className="user-name">
                  {user.userId || user.userName}
                </span>
                님 환영합니다.
              </div>
              <button className="btn-logout" onClick={handleLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-login">
                로그인
              </Link>
              <Link to="/join" className="btn-join">
                회원가입
              </Link>
            </>
          )}
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
