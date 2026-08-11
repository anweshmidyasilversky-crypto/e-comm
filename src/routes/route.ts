import { CategoryCarousel } from "@/components/dashboard/category.carousel";
import { DashboardHeader } from "@/components/dashboard/dashboard.header";
import { PaginatedProducts } from "@/components/dashboard/products.paginated";
import { AuthGuard } from "@/guards/auth.guard";
import { CartPage } from "@/pages/cart.page";
import { SignupPage } from "@/pages/signup.page";
import { ProductPage } from "@/pages/product.page";
import { createElement } from "react";
import { type RouteObject } from "react-router";
import { SignInPage } from "@/pages/signin.page";
import { SignInWithEmail } from "@/pages/signinWithEmail.page";

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: SignupPage,
  },
  {
    path: "/signin",
    Component: SignInPage,
  },
  {
    path: "/email-signin",
    Component: SignInWithEmail,
  },
  {
    element: createElement(AuthGuard),
    children: [
      {
        element: createElement(DashboardHeader),
        children: [
          {
            path: "/product/:pId",
            Component: ProductPage,
          },
          {
            path: "/cart",
            Component: CartPage,
          },
          {
            path: "/dashboard",
            Component: CategoryCarousel,
            children: [
              { index: true, Component: PaginatedProducts },
              { path: ":id", Component: PaginatedProducts },
            ],
          },
        ],
      },
    ],
  },
];
