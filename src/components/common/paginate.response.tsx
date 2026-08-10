import type { Product, ProductApiRes } from "@/types/products.type";
import { Paginate } from "./paginate";
import { Skeleton } from "../ui/skeleton";
import SmartImage from "../ui/smartImg";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addItem } from "@/redux/slices/cart.slice";

type PaginateResponseProps = {
  data: ProductApiRes | undefined;
  isFetching: boolean;
  itemsPerPage: number;
  setItemsPerPage: (value: React.SetStateAction<number>) => void;
  setCurrPage: (value: React.SetStateAction<number>) => void;
  currPage: number;
};

export function PaginateResponse({
  data,
  itemsPerPage,
  setCurrPage,
  setItemsPerPage,
  currPage,
  isFetching,
}: PaginateResponseProps) {
  const navigate = useNavigate();
  const dispath = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const handleAddToCart = (product: Product, qty: number) => {
    dispath(
      addItem({
        product,
        qty,
      }),
    );
  };

  const isProductInCart = (id: number) => {
    return cart.products.some((productEntry) => productEntry.product.id === id);
  };

  if (isFetching) {
    return (
      <div className="h-full w-full flex item-center justify-center bg-gray-50/50">
        <div className="h-30 w-30 aspect-square animate-spin rounded-full border-[6px] border-gray-200 border-t-blue-600"></div>
      </div>
    );
  }

  if (data?.products.length === 0) {
    return (
      <div className="w-full h-full flex justify-center">
        <p> No products Found..... </p>
      </div>
    );
  }

  return (
    <div className={`w-full`}>
      {data?.products && data.products.length > 0 && (
        <div className="h-full w-full">
          <Paginate
            totalPages={Math.ceil(data.total / itemsPerPage)}
            currPage={currPage}
            setCurrPage={setCurrPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            startPage={Math.max(1, currPage - 2)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.products.map((product) => {
                const inCart = isProductInCart(product.id);
                return (
                  <Card
                    key={product.id}
                    className={`group
                      cursor-pointer
                      overflow-hidden
                      rounded-2xl
                      border
                      border-gray-200
                      bg-white
                      shadow-sm
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-xl
                      hover:border-[#2874f0]/30`}
                  >
                    <div onClick={() => navigate(`/product/${product.id}`)}>
                      <div className="flex justify-center bg-slate-50">
                        {" "}
                        {isFetching ? (
                          <Skeleton className="h-[280px] w-full"></Skeleton>
                        ) : (
                          <SmartImage
                            className="h-[280px] w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                            src={product.thumbnail}
                          />
                        )}{" "}
                      </div>

                      <CardHeader className="flex flex-col gap-5 p-6">
                        <CardTitle className="space-y-5">
                          {" "}
                          {
                            <div className="space-y-4">
                              <p className="text-3xl font-bold tracking-tight text-[#2874f0]">
                                {" "}
                                ${product.price}{" "}
                              </p>
                              <div className="flex items-start justify-between gap-3">
                                <span className="font-semibold text-gray-900 leading-6 line-clamp-2">
                                  {product.title}
                                </span>
                                {product.brand && (
                                  <span className=" rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 whitespace-nowrap">
                                    {product.brand}
                                  </span>
                                )}
                              </div>
                            </div>
                          }{" "}
                        </CardTitle>

                        <CardDescription className="space-y-5">
                          <div className="text-sm leading-6 text-gray-500 line-clamp-3">
                            {product.description}
                          </div>
                          <div className=" flex items-center justify-between border-t border-gray-100 pt-4 ">
                            <span className="text-gray-500 font-medium">
                              ⭐ Rating
                            </span>

                            <span className="rounded-full bg-yellow-50 px-3 py-1 text-sm font-semibold text-yellow-700">
                              {product.rating}
                            </span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                    </div>
                    <Button
                      disabled={product.stock === 0}
                      className={`h-12 w-full rounded-xl ${inCart ? "bg-[#00ff00]" : "bg-[#fb641b]"} text-base font-semibold text-white hover:${inCart ? "bg-[#00ff00]" : "bg-[#e15615]"} `}
                      onClick={() =>
                        handleAddToCart(product, product.minimumOrderQuantity)
                      }
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      {inCart ? "Already in cart" : "Add To Cart"}
                    </Button>
                  </Card>
                );
              })}{" "}
            </div>
          </Paginate>
        </div>
      )}
    </div>
  );
}
