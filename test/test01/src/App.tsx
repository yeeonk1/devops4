import React, { useState } from "react";
import { UserProfile } from "../src/data/user";

export default function App() {
  const [user, setUser] = useState<UserProfile>({
    // [현재 값, 변경 함수] useState로 변수 관리, useProfile 설계도대로인 데이터만 받기
    name: "",
    isRegistered: false,
  });

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // input요소 타입인 change 이벤트를 e에 저장
    setUser({ ...user, name: e.target.value }); // ...user가 먼저 펼쳐지며 기존 name="", isRigistered: false가 입장
  }; // 그 후, name: "새로운 이름" 등장 (앞에 있는  빈칸 덮어버림)
  // 그래서 작성 순서 바뀌면 에러 주의!

  return (
    <div className="m-4">
      <h1>사용자 등록</h1>
      <input
        type="text"
        placeholder="이름 입력"
        value={user.name}
        className="p-2 w-80 h-5 border border-gray-400"
        onChange={onchange}
      />
      <button className="m-2 w-15 h-10 p-2">확인</button>
      <p>이름을 입력하고 확인을 눌러주세요.</p>
    </div>
  );
}
