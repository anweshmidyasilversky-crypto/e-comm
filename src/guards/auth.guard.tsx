import { useAppSelector } from "@/redux/store";
import { Navigate, Outlet } from "react-router";
import { toast } from "react-toastify";

export function AuthGuard() {
  const user = useAppSelector((state) => state.user);

  if (user.firstName.length === 0) {
    toast("Please Login", { type: "warning" });
    return <Navigate to={{ pathname: "/" }} replace={true} />;
  }
  return <Outlet />;
}
