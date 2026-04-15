import type React from "react";
import { useState, type FormEvent } from "react";
import type { memberDTO } from "../../types/Community";
import { memberApi } from "../../api/communityApi";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState<Partial<memberDTO>>({
    userId: "",
    userName: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    try {
      const res = await memberApi.login(login as memberDTO);
      sessionStorage.setItem("user", JSON.stringify(res.data));
      alert(`${res.data.userId}님, 환영합니다!`);
      navigate("/");
    } catch (error: unknown) {
      console.error("로그인 에러: " + error);
    }
  };

  return <div></div>;
};

export default Login;
