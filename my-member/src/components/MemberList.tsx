import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Member } from "../types/Member";
import { memberApi } from "../api/memberApi";
import "./MemberList.css";

const MemberList: React.FC = () => {
  const [list, setList] = useState<Member[]>([]);
  useEffect(() => {
    memberApi
      .list()
      .then((data) => setList(data))
      .catch(console.error);
  }, []);

  return (
    <div className="list-container">
      <div className="list-card">
        <h2 className="list-title">회원 목록</h2>
        <table className="list-table">
          <thead>
            <tr>
              <th>아이디</th>
              <th>이름</th>
              <th>성별</th>
              <th>생일</th>
              <th>메일</th>
              <th>전화번호</th>
              <th>주소</th>
              <th>가입일</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((member) => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td>
                    <Link to={`/detail/${member.id}`}>{member.name}</Link>
                  </td>
                  <td>{member.gender}</td>
                  <td>{member.birth}</td>
                  <td>{member.mail}</td>
                  <td>{member.phone}</td>
                  <td>{member.address}</td>
                  <td>{member.registDay}</td>
                </tr>
              ))
            ) : (
              <div className="list-none">
                <td colSpan={8}>등록된 회원이 없습니다.</td>
              </div>
            )}
          </tbody>
        </table>

        <div className="go-write">
          <Link to={"/write"}>회원 가입</Link>
        </div>
      </div>
    </div>
  );
};

export default MemberList;
