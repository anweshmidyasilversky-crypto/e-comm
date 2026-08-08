import { getProducts, searchProducts } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { PaginateResponse } from "../common/paginate.response";
import { errorToast } from "../common/axiosError.toast";

export function PaginatedProducts() {
  const params = useParams();
  const categoryName = params.id ?? "";

  const [searchParams] = useSearchParams();
  const term = searchParams.get("q");
  const [pageNo, setPageNo] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    setPageNo(1);
  }, [categoryName]);

  if (term && term.length >= 1) {
    const { data, isError, error, isFetching } = useQuery({
      queryKey: ["products", pageNo, itemsPerPage, term],
      queryFn: () =>
        searchProducts(term ?? "", itemsPerPage, (pageNo - 1) * itemsPerPage),
    });

    if (isError) {
      return errorToast(error);
    }

    return (
      <PaginateResponse
        data={data}
        isFetching={isFetching}
        itemsPerPage={itemsPerPage}
        setCurrPage={setPageNo}
        setItemsPerPage={setItemsPerPage}
        currPage={pageNo}
      />
    );
  }

  const { data, isError, error, isFetching } = useQuery({
    queryKey: ["products", pageNo, itemsPerPage, categoryName],
    queryFn: () =>
      getProducts(itemsPerPage, (pageNo - 1) * itemsPerPage, categoryName),
  });

  if (isError) {
    return errorToast(error);
  }

  return (
    <PaginateResponse
      data={data}
      isFetching={isFetching}
      itemsPerPage={itemsPerPage}
      setCurrPage={setPageNo}
      setItemsPerPage={setItemsPerPage}
      currPage={pageNo}
    />
  );
}
