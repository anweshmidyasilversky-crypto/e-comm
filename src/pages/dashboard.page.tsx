import { CategoryCarousel } from "@/components/dashboard/category.carousel";
import { Outlet } from "react-router";

export function Dashboard() {
  return (
    <div className="w-full flex flex-col gap-6 p-6">
      <CategoryCarousel />
      <Outlet />
    </div>
  );
}
