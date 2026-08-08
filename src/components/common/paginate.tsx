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
            <SelectTrigger className="h-9 w-[100px] rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-700 shadow-none transition hover:border-[#2874f0]/30 hover:bg-[#2874f0]/5 hover:text-[#2874f0] focus:border-[#2874f0] focus:ring-2 focus:ring-[#2874f0]/20">
              <SelectValue placeholder="5" />
            </SelectTrigger>

            <SelectContent className="rounded-xl border-slate-200 bg-white shadow-lg">
              {[5, 10, 15].map((noOfItems) => {
                return (
                  <SelectItem
                    key={noOfItems}
                    value={noOfItems.toString()}
                    className="cursor-pointer rounded-lg text-sm"
                  >
                    {noOfItems}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="py-6">{children}</div>
      <Pagination>
        <PaginationContent className="gap-1.5">
          <PaginationItem>
            <PaginationPrevious
              className="rounded-full border border-slate-200 text-slate-600 hover:border-[#2874f0]/30 hover:bg-[#2874f0]/5 hover:text-[#2874f0]"
              onClick={() =>
                setCurrPage((curr) => (curr > 1 ? curr - 1 : curr))
              }
            >
              {" "}
              Previous{" "}
            </PaginationPrevious>
          </PaginationItem>

          {Array.from({ length: Math.min(3, totalPages) }).map((_, idx) => {
            const isActive = startPage + idx === currPage;
            return (
              <PaginationItem key={startPage + idx}>
                <PaginationLink
                  onClick={() => setCurrPage(startPage + idx)}
                  isActive={isActive}
                  className={
                    isActive
                      ? "rounded-full border-[#2874f0] bg-[#2874f0] text-white hover:bg-[#1e5fd1]"
                      : "rounded-full border border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50"
                  }
                >
                  {" "}
                  {startPage + idx}{" "}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              className="rounded-full border border-slate-200 text-slate-600 hover:border-[#2874f0]/30 hover:bg-[#2874f0]/5 hover:text-[#2874f0]"
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
