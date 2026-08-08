import type { Product, ProductApiRes } from "@/types/products.type";
import { Paginate, type paginationProps } from "./paginate";
import { Skeleton } from "../ui/skeleton";
import SmartImage from "../ui/smartImg";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { useAppDispatch } from "@/redux/store";
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
  const handleAddToCart = (product: Product) => {
    dispath(
      addItem({
        product,
        qty: 1,
      }),
    );
  };
  return (
    <div className={`w-full bg-[#fafafa] min-h-screen p-6`}>
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
                return (
                  <Card
                    key={product.id}
                    className={`group
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
                      hover:border-gray-300`}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="flex justify-center">
                      {" "}
                      {isFetching ? (
                        <Skeleton className="h-[400px] w-[400px]"></Skeleton>
                      ) : (
                        <SmartImage
                          className="w-[400px] h-[400px]"
                          src={product.thumbnail}
                        />
                      )}{" "}
                    </div>

                    <CardHeader className="flex flex-col gap-5 p-6">
                      <CardTitle className="space-y-5">
                        {" "}
                        {
                          <div className="space-y-4">
                            <p className="text-3xl font-bold tracking-tight text-black">
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

                        <Button
                          disabled={product.stock === 0}
                          className={`h-12 w-full rounded-xl text-base font-semibold`}
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="mr-2 h-5 w-5" />
                          Add To Cart
                        </Button>
                      </CardDescription>
                    </CardHeader>
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
