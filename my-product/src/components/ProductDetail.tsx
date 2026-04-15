import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productApi } from "../api/axiosInstance";
import type { Product } from "../types/Product";
import "./ProductDetail.css";

const ProductDetail: React.FC = () => {
  const { num } = useParams<{ num: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (num) {
      productApi
        .getDetail(Number(num))
        .then((data) => setProduct(data))
        .catch(console.error);
    }
  }, [num]);

  const handleUpdate = async () => {
    console.log("현재 상품 데이터 상태" + product);
    if (!product) {
      return;
    }

    if (!product.name.trim()) {
      return alert("상품명을 입력해주세요.");
    }

    await productApi.update(product);
    alert("수정 완료");
    navigate("/");
  };

  const handleDelete = async () => {
    if (!window.confirm("삭제하시겠습니까?")) {
      return;
    }

    await productApi.delete(Number(num));
    alert("삭제 완료");
    navigate("/");
  };

  if (!product) {
    return <div className="detail-page">Loading...</div>;
  }

  return (
    <div className="detail-page">
      <div className="detail-card">
        <h2>상품 상세 정보</h2>

        <div className="form-group">
          <label>상품명</label>
          <input
            key={`name-${num}`}
            className="input-field"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>가격</label>
          <input
            key={`price-${num}`}
            type="number"
            className="input-field"
            value={product.price || 0}
            onChange={(e) =>
              setProduct({ ...product, price: Number(e.target.value) })
            }
          />
        </div>

        <div className="form-group">
          <label>수량</label>
          <input
            key={`amount-${num}`}
            type="number"
            className="input-field"
            value={product.amount || 0}
            onChange={(e) =>
              setProduct({ ...product, amount: Number(e.target.value) })
            }
          />
        </div>

        <div className="button-group">
          <button className="btn btn-list" onClick={() => navigate("/")}>
            목록으로
          </button>
          <button className="btn btn-update" onClick={handleUpdate}>
            수정 완료
          </button>
          <button className="btn btn-delete" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
