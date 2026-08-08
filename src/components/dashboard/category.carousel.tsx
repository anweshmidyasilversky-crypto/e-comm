import { getCategories } from "@/api/api";
import type { Category } from "@/types/category.type";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { Outlet, useNavigate } from "react-router";

export function CategoryCarousel() {
  const navigate = useNavigate();
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["catgories"],
    queryFn: () => getCategories(),
  });

  if (isError) {
    if (isAxiosError(error)) {
      toast(
        error.response?.data?.message ??
          error.message ??
          "Something went wrong",
      );
    }
  }

  return (
    <div className="w-full flex flex-col gap-6 p-6">
      <div className="flex items-center justify-center">
        <Carousel
          opts={{
            align: "start",
          }}
          className="mx-auto w-full max-w-3xl"
        >
          {isError && (
            <p className="flex aspect-square items-center justify-center p-4">
              {" "}
              Failed to load{" "}
            </p>
          )}
          {isFetching && (
            <div className="flex justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-t-transparent"></div>
            </div>
          )}
          {data && (
            <CarouselContent className="w-full">
              {(data as Category[]).map((category) => (
                <CarouselItem
                  key={category.slug}
                  className="basis-1/4 sm:basis-1/4"
                >
                  <div className="p-1">
                    <Card
                      className="h-[100px]"
                      onClick={() => {
                        navigate(`/dashboard/${category.slug}`);
                      }}
                    >
                      <CardContent className="flex aspect-square items-center justify-center h-full">
                        <span className="text-sm font-semibold">
                          {category.name}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          )}

          <CarouselPrevious className="-left-8" />
          <CarouselNext className="-right-8" />
        </Carousel>
      </div>
      <Outlet />
    </div>
  );
}
