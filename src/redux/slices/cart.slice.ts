import type { Cart } from "@/types/cart.type";
import type { Product } from "@/types/products.type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState: Cart = {
  products: [],
};

type AddCartObject = {
  product: Product;
  qty: number;
};

type ChangeQtyObject = {
  id: number;
  qty: number;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addItem(state, action: PayloadAction<AddCartObject>) {
      const idx = state.products.findIndex(
        (productEntry) => productEntry.product.id === action.payload.product.id,
      );

      if (idx > -1) {
        toast("Product Already exists in cart", { type: "error" });
      } else {
        state.products = [
          ...state.products,
          {
            product: action.payload.product,
            qty: action.payload.qty,
          },
        ];
        toast("Added to cart", { type: "success" });
      }
    },

    changeQty(state, action: PayloadAction<ChangeQtyObject>) {
      const idx = state.products.findIndex(
        (productEntry) => productEntry.product.id === action.payload.id,
      );

      if (idx === -1) {
        return;
      }
      state.products = [
        ...state.products.slice(0, idx),
        {
          product: state.products[idx].product,
          qty: action.payload.qty,
        },
        ...state.products.slice(idx + 1),
      ];
    },

    removeItem(state, action: PayloadAction<number>) {
      const product = state.products.find(
        (productEntry) => productEntry.product.id === action.payload,
      );

      state.products = state.products.filter(
        (productEntry) => productEntry.product.id !== action.payload,
      );
      toast(`Removed ${product?.product.title ?? "Product"}`, {
        type: "success",
      });
    },

    clearCart(state) {
      state.products = [];
    },
  },
});

export const { addItem, changeQty, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
