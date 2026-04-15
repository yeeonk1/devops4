export interface Product {
  num: number;
  name: string;
  price: number;
  amount: number;
}

export type ProductInput = Omit<Product, "num">;
// num는 자동 입력이라 제외
