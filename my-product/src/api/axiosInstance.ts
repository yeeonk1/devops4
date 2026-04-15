import axios from "axios";
import type { Product, ProductInput } from "../types/Product";

const instance = axios.create({
  baseURL: "/api/product",
  headers: {
    "Content-Type": "application/json",
  },
});

export const productApi = {
  getList: () => instance.get<Product[]>("/list").then((res) => res.data),
  getDetail: (num: number) =>
    instance.get<Product>(`/detail/${num}`).then((res) => res.data),
  insert: (data: ProductInput) =>
    instance.post<string>("/insert", data).then((res) => res.data),
  update: (data: Product) =>
    instance.put<string>(`/update/${data.num}`, data).then((res) => res.data),
  delete: (num: number) =>
    instance.delete<string>(`/delete/${num}`).then((res) => res.data),
};

export default instance;
