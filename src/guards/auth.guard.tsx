import { useAppSelector } from "@/redux/store";
import { Outlet, useNavigate } from "react-router";
import { toast } from "react-toastify";

export function AuthGuard() {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(user);
  if (user.firstName.length === 0) {
    toast("Please login", { type: "warning" });
    navigate("/");
  }

  return <Outlet />;
}
