import { useAppSelector } from "@/redux/store";
import { Navigate, Outlet } from "react-router";

export function AuthGuard() {
  const user = useAppSelector((state) => state.user);

  if (user.firstName.length === 0) {
    return <Navigate to={{ pathname: "/" }} replace={true} />;
  }
  return <Outlet />;
}
