import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { Paginate } from "@/components/common/paginate";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useState } from "react";
import { changeQty, removeItem } from "@/redux/slices/cart.slice";
import { useNavigate } from "react-router";

export function CartPage() {
  const cart = useAppSelector((state) => state.cart);
  const dispath = useAppDispatch();
  const [pageNo, setPageNo] = useState(1);
  const navigate = useNavigate();

  const [itemsPerPage, setItemsPerPage] = useState(5);

  const paginatedProducts = cart.products.slice(
    (pageNo - 1) * itemsPerPage,
    pageNo * itemsPerPage,
  );

  const totalQuantity = cart.products.reduce((acc, item) => acc + item.qty, 0);

  const subtotal = cart.products.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0,
  );

  if (cart.products.length === 0) {
    return (
      <div className="flex justify-center flex-col">
        <p> Cart Is Empty </p>
        <Button onClick={() => navigate("/dashboard")}> Go to home </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <Card className="rounded-3xl border border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <div>
              <CardTitle className="text-3xl">Shopping Cart</CardTitle>

              <CardDescription>Review your selected products</CardDescription>
            </div>

            <Badge variant="secondary" className="rounded-full px-4 py-1">
              {cart.products.length} Items
            </Badge>
          </CardHeader>

          <CardContent className="p-6">
            <Paginate
              totalPages={Math.ceil(cart.products.length / itemsPerPage)}
              currPage={pageNo}
              setCurrPage={setPageNo}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              startPage={Math.max(1, pageNo - 1)}
            >
              <div className="space-y-5">
                {paginatedProducts.map((item) => (
                  <Card
                    key={item.product.id}
                    className="rounded-2xl border border-slate-200 shadow-sm transition hover:shadow-md"
                  >
                    <CardContent className="flex flex-col gap-5 p-5 md:flex-row md:items-center">
                      {/* Product Image */}

                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="h-28 w-28 rounded-xl bg-slate-50 object-contain p-3"
                      />

                      {/* Product Details */}

                      <div className="flex-1 space-y-3">
                        <h3 className="text-xl font-semibold">
                          {item.product.title}
                        </h3>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">
                            {item.product.brand}
                          </Badge>

                          <Badge variant="outline">
                            {item.product.category}
                          </Badge>
                        </div>

                        <p className="line-clamp-2 text-sm text-slate-500">
                          {item.product.description}
                        </p>
                      </div>

                      {/* Quantity */}

                      <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center overflow-hidden rounded-xl border border-slate-200">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              dispath(
                                changeQty({
                                  id: item.product.id,
                                  qty: Math.max(1, item.qty - 1),
                                }),
                              )
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>

                          <span className="w-12 text-center font-semibold">
                            {item.qty}
                          </span>

                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              dispath(
                                changeQty({
                                  id: item.product.id,
                                  qty: Math.max(1, item.qty + 1),
                                }),
                              )
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="destructive"
                          size="sm"
                          className="rounded-xl"
                          onClick={() => dispath(removeItem(item.product.id))}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove
                        </Button>
                      </div>

                      {/* Price */}

                      <div className="min-w-[120px] text-right">
                        <p className="text-2xl font-bold">
                          ${(item.product.price * item.qty).toFixed(2)}
                        </p>

                        <p className="text-sm text-slate-500">
                          ${item.product.price} each
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Paginate>
          </CardContent>
        </Card>

        <Card className="sticky top-8 h-fit rounded-3xl border border-slate-200 shadow-sm">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl font-bold">Order Summary</CardTitle>

            <CardDescription>Review your order before checkout</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Products</span>

                <span className="font-semibold">{cart.products.length}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Total Quantity</span>

                <span className="font-semibold">
                  {/* Replace with your total quantity */}
                  {totalQuantity}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Subtotal</span>

                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Shipping</span>

                <span className="font-semibold text-green-600">Free</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500">Tax</span>

                <span className="font-semibold">$0.00</span>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <span className="text-xl font-bold">Total</span>

              <span className="text-2xl font-bold text-indigo-600">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <Button
              size="lg"
              className="h-12 w-full rounded-xl text-base font-semibold"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Proceed To Checkout
            </Button>

            <Button
              variant="outline"
              className="h-12 w-full rounded-xl"
              onClick={() => navigate("/dashboard")}
            >
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
