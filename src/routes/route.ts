import { PaginatedProducts } from "@/components/dashboard/products.paginated";
import { AuthGuard } from "@/guards/auth.guard";
import { CartPage } from "@/pages/cart.page";
import { Dashboard } from "@/pages/dashboard.page";
import { LoginPage } from "@/pages/login.page";
import { ProductPage } from "@/pages/product.page";
import { createElement } from "react";
import { type RouteObject } from "react-router";

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: LoginPage,
  },
  {
    element: createElement(AuthGuard),
    children: [
      {
        path: "/dashboard",
        Component: Dashboard,

        children: [
          {
            index: true,
            Component: PaginatedProducts,
          },
          {
            path: "/dashboard/:id",
            Component: PaginatedProducts,
          },
        ],
      },

      {
        element: createElement(Dashboard),
        children: [
          {
            path: "/product/:pId",
            Component: ProductPage,
          },
        ],
      },
      {
        path: "/cart",
        Component: CartPage,
      },
    ],
  },
];
