import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { memberApi } from "../api/memberApi";
import type { MemberInfoDTO } from "../types/Member";
import "./MemberList.css";

const MemberList: React.FC = () => {
  const [members, setMembers] = useState<MemberInfoDTO[]>([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    const res = await memberApi.getList();
    setMembers(res.data);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list-container">
      <h2 className="list-title">회원 관리 목록</h2>
      <table className="board-table">
        <thead>
          <tr>
            <th>아이디</th>
            <th>이름</th>
            <th>연락처</th>
            <th>가입일</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td>
                <Link to={`/detail/${m.id}`} className="title-link">
                  {m.id}
                </Link>
              </td>
              <td>{m.name}</td>
              <td>{m.phone}</td>
              <td>{m.registDay}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="btn-area">
        <button className="btn-write" onClick={() => navigate("/write")}>
          회원 등록
        </button>
      </div>
    </div>
  );
};

export default MemberList;
