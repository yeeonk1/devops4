import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productApi } from "../api/axiosInstance";
import type { Product } from "../types/Product";
import "./ProductList.css";

const ProductList: React.FC = () => {
  const [list, setList] = useState<Product[]>([]);

  useEffect(() => {
    productApi
      .getList()
      .then((data) => setList(data))
      .catch(console.error);
  }, []);

  return (
    <div className="list-container">
      <h2 className="list-title">상품 목록</h2>
      <table className="border-table">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>번호</th>
            <th style={{ width: "50%" }}>상품명</th>
            <th style={{ width: "20%" }}>가격</th>
            <th style={{ width: "20%" }}>수량</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 ? (
            list.map((product) => (
              <tr key={product.num}>
                <td>{product.num}</td>
                <td style={{ textAlign: "left" }}>
                  <Link className="title-link" to={`/product/${product.num}`}>
                    {product.name}
                  </Link>
                </td>
                <td>{product.price.toLocaleString()}원</td>
                <td>{product.amount}개</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>등록된 상품이 존재하지 않습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="btn-area">
        <Link to={"/insert"}>
          <button className="btn-write">상품 등록</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
