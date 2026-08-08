import { CategoryCarousel } from "@/components/dashboard/category.carousel";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Outlet, useNavigate } from "react-router";
import { persistor, useAppSelector } from "@/redux/store";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useDeferredValue, useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

export function Dashboard() {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const val = useDeferredValue(searchTerm);

  const handleLogout = () => {
    persistor.purge();
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
    <div className="w-full flex flex-col gap-6 p-6">
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

        <ShoppingCart onClick={() => navigate("/cart")} />

        <Button variant={"destructive"} onClick={() => handleLogout()}>
          Logout
        </Button>
      </div>
      <CategoryCarousel />
      <Outlet />
    </div>
  );
}
