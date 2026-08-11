import { Avatar, AvatarFallback } from "../ui/avatar";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useNavigate, Outlet, useMatch } from "react-router";
import { useState, useEffect } from "react";
import { persistor } from "@/redux/store";
import { Search, ShoppingBag, ShoppingCart, LogOut } from "lucide-react";
import { removeUser } from "@/redux/slices/user.slice";
import { clearCart } from "@/redux/slices/cart.slice";
import { toast } from "react-toastify";
import { showModal } from "../common/customModal";
import { useDebounce } from "@/hooks/debounce.hook";

export function DashboardHeader() {
  const user = useAppSelector((state) => state.user);
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const val = useDebounce({ value: searchTerm, delay: 500 });

  const handleSearch = (term: string) =>
    navigate(`/dashboard?q=${term}`, { replace: true });

  useEffect(() => {
    if (val.length >= 1) {
      handleSearch(val);
    }
  }, [val]);

  const handleLogout = () => {
    dispatch(removeUser());
    dispatch(clearCart());
    persistor.purge();
    toast.success("Logout Success", {
      onOpen: () => {
        navigate("/");
      },
    });
  };

  const showLogoutModal = () => {
    showModal({
      options: {
        title: "Do you want to log out?",
        icon: "warning",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Logout",
        cancelButtonText: "Cancel",
      },
      onConfirmAction: handleLogout,
    });
  };

  const cartCount = cart.products.length;

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          {/* Logo */}
          <button
            onClick={() => navigate("/dashboard")}
            className="flex shrink-0 items-center gap-2 rounded-lg transition hover:opacity-80"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2874f0] text-white">
              <ShoppingBag className="h-5 w-5" />
            </span>
            <span className="hidden text-lg font-bold tracking-tight text-slate-900 sm:inline">
              Shoply
            </span>
          </button>

          {/* Search option */}
          <Field
            orientation="horizontal"
            className="flex w-full max-w-2xl flex-1 items-center gap-0"
          >
            <div className="relative w-full">
              <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                className="h-11 w-full rounded-full border-slate-200 bg-slate-100 pl-10 pr-28 shadow-none transition focus-visible:border-[#2874f0] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#2874f0]/20"
                type="search"
                placeholder="Search for products, brands and more"
                onChange={(event) => {
                  if (event.target.value.trim().length >= 1)
                    setSearchTerm(event.target.value.trim());
                }}
              />
              <Button
                className="absolute top-1/2 right-1.5 h-8 -translate-y-1/2 rounded-full bg-[#2874f0] px-4 text-xs font-semibold hover:bg-[#1e5fd1]"
                onClick={() => handleSearch(searchTerm)}
              >
                Search
              </Button>
            </div>
          </Field>

          {/* Cart */}
          {!useMatch("/cart") && (
            <button
              onClick={() => navigate("/cart")}
              className="relative flex shrink-0 items-center gap-2 rounded-full px-2 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-[#2874f0] sm:px-3"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden text-sm font-medium sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#fb641b] px-1 text-[11px] font-bold text-white ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Avatar */}
          <Avatar
            className="h-9 w-9 shrink-0 border border-slate-200"
            onClick={() => navigate("/user")}
          >
            <AvatarFallback className="bg-[#2874f0]/10 font-semibold text-[#2874f0]">
              {user.firstName.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Logout */}
          <Button
            variant={"destructive"}
            onClick={() => showLogoutModal()}
            className="hidden shrink-0 items-center gap-1.5 rounded-full sm:flex"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
