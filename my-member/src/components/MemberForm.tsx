import type React from "react";
import { useNavigate } from "react-router-dom";
import { memberApi } from "../api/memberApi";
import { useActionState } from "react";
import "./MemberForm.css";

const MemberForm: React.FC = () => {
  const navigate = useNavigate();

  const [state, formAction, isPending] = useActionState(
    async (_prev: any, formData: FormData) => {
      try {
        const data = {
          id: formData.get("id") as string,
          password: formData.get("password") as string,
          name: formData.get("name") as string,
          gender: formData.get("gender") as string,
          birth: formData.get("birth") as string,
          mail: formData.get("mail") as string,
          phone: formData.get("phone") as string,
          address: formData.get("address") as string,
        };

        await memberApi.write(data);
        navigate("/");
        return { success: true, error: null };
      } catch (error) {
        return { success: false, error: "등록 중 오류가 발생했습니다." };
      }
    },

    {
      success: false,
      error: null,
    },
  );

  return (
    <div className="write-container">
      <div className="write-card">
        <h2 className="write-title">회원 등록</h2>
        <form action={formAction} className="write-form">
          <div className="write-form">
            <label>아이디</label>
            <input
              type="text"
              name="id"
              required
              placeholder="아이디를 입력하세요."
            />

            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              required
              placeholder="비밀번호를 입력하세요."
            />

            <label>이름</label>
            <input
              type="text"
              name="name"
              required
              placeholder="이름을 입력하세요."
            />

            <div className="gender-group">
              <label className="gender-label">
                <span>남자</span>
                <input type="radio" name="gender" value="M" required />
              </label>
              <label className="gender-label">
                <span>여자</span>
                <input type="radio" name="gender" value="F" required />
              </label>
            </div>

            <label>생년월일</label>
            <input type="date" name="birth" required />

            <label>이메일</label>
            <input
              type="email"
              name="mail"
              required
              placeholder="이메일을 입력하세요."
            />

            <label>전화번호</label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="전화번호를 입력하세요."
            />

            <label>주소</label>
            <input
              type="text"
              name="address"
              required
              placeholder="주소를 입력하세요."
            />
          </div>

          {state?.error && <p>{state.error}</p>}

          <div className="write-control">
            <button type="submit">
              {isPending ? "가입 중..." : "회원 가입 완료"}
            </button>
            <button type="button" onClick={() => navigate("/")}>
              취소 및 돌아가기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberForm;
