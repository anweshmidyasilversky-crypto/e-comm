import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "../ui/pagination";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

export type paginationProps = {
  children: React.ReactNode;
  itemsPerPage: number;
  setItemsPerPage: (value: React.SetStateAction<number>) => void;
  setCurrPage: (value: React.SetStateAction<number>) => void;
  totalPages: number;
  startPage: number;
  currPage: number;
  onItemPerPageSelect?: (prevPage: number) => void;
};

export function Paginate({
  children,
  itemsPerPage,
  setItemsPerPage,
  setCurrPage,
  totalPages,
  startPage,
  currPage,
  onItemPerPageSelect,
}: paginationProps) {
  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
          <label className="text-sm font-medium text-slate-600">
            Items per page
          </label>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              onItemPerPageSelect ? onItemPerPageSelect(Number(value)) : "";
              const nextValue = Number(value);
              setItemsPerPage(nextValue);
              // setCurrPage(1);
            }}
          >
            <SelectTrigger className="h-9 w-[100px] rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 shadow-none transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">
              <SelectValue placeholder="5" />
            </SelectTrigger>

            <SelectContent className="rounded-xl border-slate-200 bg-white shadow-lg">
              {[5, 10, 15].map((noOfItems) => {
                return (
                  <SelectItem
                    key={noOfItems}
                    value={noOfItems.toString()}
                    className="cursor-pointer rounded-lg text-sm text-slate-700 focus:bg-indigo-50 focus:text-indigo-700"
                  >
                    {noOfItems}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      <br /> <br />
      {children}
      <br /> <br />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() =>
                setCurrPage((curr) => (curr > 1 ? curr - 1 : curr))
              }
            >
              {" "}
              Previous{" "}
            </PaginationPrevious>
          </PaginationItem>

          {Array.from({ length: Math.min(3, totalPages) }).map((_, idx) => {
            return (
              <PaginationItem key={startPage + idx}>
                <PaginationLink
                  onClick={() => setCurrPage(startPage + idx)}
                  isActive={startPage + idx === currPage}
                >
                  {" "}
                  {startPage + idx}{" "}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrPage((curr) => (curr < totalPages ? curr + 1 : curr))
              }
            >
              {" "}
              Next{" "}
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
