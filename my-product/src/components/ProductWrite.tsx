import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { productApi } from "../api/axiosInstance";
import "./ProductWrite.css";

export default function ProductWrite() {
  const navigate = useNavigate();

  const [state, formAction, isPending] = useActionState(
    async (_prev: any, formData: FormData) => {
      try {
        const data = {
          name: formData.get("name") as string,
          price: Number(formData.get("price")),
          amount: Number(formData.get("amount")),
        };

        await productApi.insert(data);
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
      <h1 className="write-title">새 상품 등록</h1>
      <form action={formAction}>
        <div className="form-group">
          <label>상품명</label>
          <input
            name="name"
            className="form-control"
            required
            placeholder="상품명을 입력하세요."
            autoComplete="off"
          />
        </div>

        <div className="form-group">
          <label>가격</label>
          <input
            name="price"
            type="number"
            className="form-control"
            required
            placeholder="가격을 입력하세요."
            min={0}
          />
        </div>

        <div className="form-group">
          <label>수량</label>
          <input
            type="number"
            name="amount"
            className="form-control"
            required
            placeholder="수량을 입력하세요."
            min={0}
          />
        </div>

        {state?.error && (
          <p
            style={{ color: "#e74c3c", fontSize: "14px", marginBottom: "10px" }}
          >
            {state.error}
          </p>
        )}

        <div className="btn-area">
          <button type="submit" className="btn-submit">
            {isPending ? "등록 중..." : "상품 등록 완료"}
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/")}
          >
            취소 및 돌아가기
          </button>
        </div>
      </form>
    </div>
  );
}
