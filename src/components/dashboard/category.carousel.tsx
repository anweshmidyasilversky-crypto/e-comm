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
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-4 text-sm font-bold tracking-wide text-slate-500 uppercase">
          Shop by category
        </h2>
        <div className="flex items-center justify-center">
          <Carousel
            opts={{
              align: "start",
            }}
            className="mx-auto w-full"
          >
            {isError && (
              <p className="flex aspect-square items-center justify-center p-4 text-sm text-slate-500">
                {" "}
                Failed to load{" "}
              </p>
            )}
            {isFetching && (
              <div className="flex justify-center py-6">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-[#2874f0] border-t-transparent"></div>
              </div>
            )}
            {data && (
              <CarouselContent className="w-full -ml-3">
                {(data as Category[]).map((category, index) => (
                  <CarouselItem
                    key={category.slug}
                    className="basis-1/4 pl-3 sm:basis-1/6 lg:basis-[12%]"
                  >
                    <button
                      onClick={() => {
                        navigate(`/dashboard/${category.slug}`);
                      }}
                      className="group flex w-full flex-col items-center gap-2 rounded-2xl p-2 text-center transition hover:bg-slate-50"
                    >
                      <span
                        className="flex aspect-square w-full items-center justify-center rounded-2xl text-xl font-bold text-white shadow-sm transition-transform duration-200 group-hover:-translate-y-1 group-hover:shadow-md"
                        style={{
                          background: `linear-gradient(135deg, ${
                            [
                              "#2874f0, #5b3df0",
                              "#fb641b, #f0913d",
                              "#16a34a, #4ade80",
                              "#db2777, #f472b6",
                              "#0891b2, #22d3ee",
                              "#7c3aed, #a78bfa",
                            ][index % 6]
                          })`,
                        }}
                      >
                        {category.name.at(0)?.toUpperCase()}
                      </span>
                      <span className="line-clamp-2 text-xs font-medium text-slate-700 capitalize">
                        {category.name}
                      </span>
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
            )}

            <CarouselPrevious className="-left-4 border-slate-200 bg-white shadow-md" />
            <CarouselNext className="-right-4 border-slate-200 bg-white shadow-md" />
          </Carousel>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
