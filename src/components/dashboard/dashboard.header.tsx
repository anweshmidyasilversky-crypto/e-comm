import { Avatar, AvatarFallback } from "../ui/avatar";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAppSelector } from "@/redux/store";
import { useNavigate, useLocation, Outlet, useMatch } from "react-router";
import { useState, useDeferredValue, useEffect } from "react";
import { persistor } from "@/redux/store";
import { ShoppingCart } from "lucide-react";

export function DashboardHeader() {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const val = useDeferredValue(searchTerm);

  const handleLogout = async () => {
    await persistor.purge();
    navigate("/");
  };

  const handleSearch = (term: string) =>
    navigate(`/dashboard?q=${term}`, { replace: true });

  useEffect(() => {
    if (val.length >= 1) {
      handleSearch(val);
    }
  }, [val]);

  return (
    <div className="w-full gap-6 p-6">
      <div className="w-full flex justify-between items-center">
        <Avatar>
          <AvatarFallback>{user.firstName.at(0)?.toUpperCase()}</AvatarFallback>
        </Avatar>

        {/* Search option */}
        <Field
          orientation="horizontal"
          className="w-full max-w-[600px] flex gap-2"
        >
          <Input
            className="h-[50px] w-full"
            type="search"
            placeholder="Search..."
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <Button className="h-[50px]" onClick={() => handleSearch(searchTerm)}>
            Search
          </Button>
        </Field>

        {!useMatch("/cart") && (
          <ShoppingCart onClick={() => navigate("/cart")} />
        )}

        <Button variant={"destructive"} onClick={() => handleLogout()}>
          Logout
        </Button>
      </div>
      <Outlet />
    </div>
  );
}
