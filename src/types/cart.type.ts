import type { Product } from "./products.type";

export interface Cart {
  products: {
    product: Product;
    qty: number;
  }[];
}
