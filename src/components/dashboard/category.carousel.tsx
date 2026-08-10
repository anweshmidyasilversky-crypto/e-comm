import { getCategories } from "@/api/api";
import type { Category } from "@/types/category.type";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, isAxiosError } from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import { Outlet, useNavigate } from "react-router";
import { errorToast } from "../common/axiosError.toast";
import { useRef } from "react";
import { Badge } from "../ui/badge";
import { Check } from "lucide-react";

export function CategoryCarousel() {
  const navigate = useNavigate();
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["catgories"],
    queryFn: () => getCategories(),
  });
  const selectedCat = useRef("");
  if (isError) {
    if (isAxiosError(error)) {
      errorToast(
        new AxiosError(
          error.response?.data?.message ??
            error.message ??
            "Something went wrong",
        ),
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
                        if (selectedCat.current === category.slug) {
                          selectedCat.current = "";
                          navigate(`/dashboard`);
                        } else {
                          selectedCat.current = category.slug;
                          navigate(`/dashboard/${category.slug}`);
                        }
                      }}
                      className="group flex w-full flex-col items-center gap-2 rounded-2xl p-2 text-center transition hover:bg-slate-50"
                    >
                      <span
                        className="relative flex aspect-square w-full items-center justify-center rounded-2xl text-xl font-bold text-white shadow-sm transition-transform duration-200 group-hover:-translate-y-1 group-hover:shadow-md"
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

                        {/* Tick Badge in the bottom right corner */}
                        {selectedCat.current === category.slug && (
                          <Badge
                            className="absolute bottom-0 right-0 translate-x-1 translate-y-1 rounded-full p-1 h-5 w-5 flex items-center justify-center bg-white hover:bg-white text-emerald-600 shadow-md border border-neutral-100"
                            variant="outline"
                          >
                            <Check className="h-3 w-3 stroke-[3]" />
                          </Badge>
                        )}
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
