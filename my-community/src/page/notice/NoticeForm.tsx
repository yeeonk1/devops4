import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { communityApi } from "../../api/communityApi";
import type { NoticeDTO } from "../../types/Community";
import "./NoticeForm.css";

const NoticeForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "", writer: "" });

  useEffect(() => {
    if (id) {
      communityApi.getDetail(Number(id)).then((res) => {
        setForm({ title: res.title, content: res.content, writer: res.writer });
      });
    } else {
      const userStr = sessionStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        setForm((prev) => ({ ...prev, writer: user.userName || user.userId }));
      }
    }
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (id) {
        const updateData: NoticeDTO = {
          ...form,
          id: Number(id),
          hit: 0,
        };
        await communityApi.update(updateData);
        alert("수정이 완료되었습니다.");
      } else {
        await communityApi.write(form);
        alert("성공적으로 등록되었습니다.");
      }
      navigate("/notice/list");
    } catch (error) {
      console.error("저장 에러", error);
      alert("데이터 저장 중 오류가 발생하였습니다.");
    }
  };

  const handleDeleteInForm = async () => {
    if (id && window.confirm("정말 이 글을 삭제하시겠습니까?")) {
      await communityApi.delete(Number(id));
      alert("삭제가 완료되었습니다.");
      navigate("/notice/list");
    }
  };

  return (
    <div className="form-container">
      <h2 className="member-title">{id ? "공지사항 수정" : "공지사항 등록"}</h2>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <input
            className="form-input"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="제목을 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <input
            className="form-input"
            value={form.writer}
            onChange={(e) => setForm({ ...form, writer: e.target.value })}
            placeholder="작성자"
            readOnly={!!sessionStorage.getItem("user")}
            required
          />
        </div>

        <div className="form-group">
          <textarea
            className="form-textarea"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="내용을 입력하세요"
            required
          />
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button className="form-submit-btn" type="submit">
            {id ? "수정하기" : "등록하기"}
          </button>

          {id && (
            <button
              type="button"
              className="form-submit-btn"
              onClick={handleDeleteInForm}
            >
              삭제
            </button>
          )}

          <button
            type="button"
            className="form-submit-btn"
            onClick={() => navigate(-1)}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoticeForm;
