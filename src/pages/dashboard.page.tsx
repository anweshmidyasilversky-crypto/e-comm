import { CategoryCarousel } from "@/components/dashboard/category.carousel";
import { Outlet } from "react-router";

export function Dashboard() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6">
      <CategoryCarousel />
      <Outlet />
    </div>
  );
}
