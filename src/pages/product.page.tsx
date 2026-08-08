import { getSingleProduct } from "@/api/api";
import { Paginate } from "@/components/common/paginate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselNext,
  CarouselPrevious,
  CarouselItem,
  CarouselContent,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import SmartImage from "@/components/ui/smartImg";
import { addItem } from "@/redux/slices/cart.slice";
import { useAppDispatch } from "@/redux/store";
import type { Product } from "@/types/products.type";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

export function ProductPage() {
  const params = useParams();
  const productId = params.pId;
  const [quantity, setQuantity] = useState(1);
  const [reviewPage, setReviewPage] = useState(1);
  const [reviewsPerPage, setReviewsPerPage] = useState(5);
  const dispath = useAppDispatch();

  const {
    data: product,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getSingleProduct(Number(productId)),
  });

  useEffect(() => {
    setQuantity(product?.minimumOrderQuantity ?? 1);
  }, [product]);

  if (isFetching) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#2874f0]" />
      </div>
    );
  }

  if (isError || !product) {
    let errMsg = "Something went wrong";
    if (isAxiosError(error)) {
      errMsg = error.response?.data.message ?? error.message ?? errMsg;
    }
    toast(errMsg, { type: "error" });
    return (
      <p className="flex min-h-[60vh] items-center justify-center text-slate-500">
        No product found
      </p>
    );
  }

  const handleAddToCart = (product: Product) => {
    dispath(
      addItem({
        product,
        qty: quantity,
      }),
    );
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6">
      <Card
        key={product.id}
        className="mt-6 group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
      >
        {/* Product Images */}
        <div className="mx-auto flex max-w-[700px] justify-center bg-gradient-to-b from-slate-50 to-white p-6">
          <Carousel
            opts={{
              loop: true,
              align: "start",
            }}
            className="max-w-[700px]"
          >
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="flex h-72 items-center justify-center">
                    <SmartImage
                      src={image}
                      alt={`${product.title}-${index}`}
                      className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="border-slate-200 bg-white shadow-md" />
            <CarouselNext className="border-slate-200 bg-white shadow-md" />
          </Carousel>
        </div>

        <CardHeader className="space-y-5">
          {/* Brand + Category */}

          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              {product.brand ?? "Generic"}
            </Badge>

            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {product.category}
            </span>
          </div>

          {/* Title */}

          <CardTitle className="text-2xl font-bold leading-tight line-clamp-2">
            {product.title}
          </CardTitle>

          {/* Description */}

          <CardDescription className="line-clamp-3 text-sm leading-6 text-slate-500">
            {product.description}
          </CardDescription>

          {/* Tags */}

          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>

          <Separator />

          {/* Price + Rating */}

          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-[#2874f0]">
                ${product.price}
              </p>

              <p className="text-sm font-medium text-green-600">
                {product.availabilityStatus}
              </p>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end gap-2 rounded-full bg-green-50 px-3 py-1">
                <span className="text-lg">⭐</span>

                <span className="text-lg font-semibold">
                  {product.rating.toFixed(1)}
                </span>
              </div>

              <p className="text-xs text-slate-500">
                {product.reviews.length} Reviews
              </p>
            </div>
          </div>

          <Separator />

          {/* Product Details */}

          <div className="space-y-2 rounded-2xl bg-slate-50 p-4 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Shipping</span>

              <span>{product.shippingInformation}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Warranty</span>

              <span>{product.warrantyInformation}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Return</span>

              <span>{product.returnPolicy}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Weight</span>

              <span>{product.weight} kg</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">SKU</span>

              <span>{product.sku}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Minimum Order</span>

              <span>{product.minimumOrderQuantity}</span>
            </div>
          </div>

          <Separator />

          {/* Quantity */}

          <div className="flex items-center justify-between">
            <div className="flex items-center overflow-hidden rounded-xl border border-slate-200">
              <Button
                className={`${quantity === product.minimumOrderQuantity ? "bg-red-200 hover:bg-red-200" : ""}`}
                variant="ghost"
                size="icon"
                onClick={() =>
                  setQuantity((q) =>
                    Math.max(product.minimumOrderQuantity, q - 1),
                  )
                }
              >
                -
              </Button>

              <span className="w-12 text-center font-semibold">{quantity}</span>

              <Button
                className={`${quantity === product.stock ? "bg-red-200 hover:bg-red-200" : ""}`}
                variant="ghost"
                size="icon"
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
              >
                +
              </Button>
            </div>

            <Badge variant="secondary">{product.stock} In Stock</Badge>
          </div>

          {/* Add To Cart */}

          <Button
            disabled={product.stock === 0}
            className={`h-12 w-full rounded-xl bg-[#fb641b] text-base font-semibold text-white shadow-md shadow-orange-200 hover:bg-[#e15615] hover:shadow-lg hover:shadow-orange-200`}
            onClick={() => handleAddToCart(product)}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add To Cart
          </Button>
        </CardHeader>

        <Separator />

        {/* Reviews */}

        <CardContent className="p-6">
          <h2 className="mb-6 text-xl font-bold">Customer Reviews</h2>

          <Paginate
            totalPages={Math.ceil(product.reviews.length / reviewsPerPage)}
            currPage={reviewPage}
            setCurrPage={setReviewPage}
            itemsPerPage={reviewsPerPage}
            setItemsPerPage={setReviewsPerPage}
            startPage={Math.max(1, reviewPage - 1)}
          >
            <div className="space-y-4">
              {product.reviews
                .slice(
                  (reviewPage - 1) * reviewsPerPage,
                  reviewPage * reviewsPerPage,
                )
                .map((review, index) => (
                  <Card
                    key={index}
                    className="rounded-2xl border border-slate-200 shadow-sm transition hover:shadow-md"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">
                            {review.reviewerName}
                          </CardTitle>

                          <CardDescription>
                            {review.reviewerEmail}
                          </CardDescription>
                        </div>

                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                          ⭐ {review.rating}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="leading-6 text-slate-600">
                        {review.comment}
                      </p>

                      <p className="mt-4 text-xs text-slate-400">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </Paginate>
        </CardContent>
      </Card>
    </div>
  );
}
