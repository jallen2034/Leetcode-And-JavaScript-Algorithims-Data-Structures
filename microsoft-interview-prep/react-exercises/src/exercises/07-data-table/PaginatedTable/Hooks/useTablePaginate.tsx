import {useMemo, useState} from "react";

const DEFAULT_FIRST_PAGE: number = 1;

interface UseTablePaginate<T> {
  items: T[],
  itemsPerPage: number
}

export interface UseTablePaginateReturn<T> {
  totalPages: number;
  currentPage: number;
  paginatedItems: T[];
  setCurrentPage: (page: number) => void;
  resetToFirstPage: () => void;
  showPaginationControls: boolean;
}

const useTablePaginate = <T,>({
  items,
  itemsPerPage
}: UseTablePaginate<T>): UseTablePaginateReturn<T> => {
  const [page, setPage] = useState<number>(DEFAULT_FIRST_PAGE);

  const totalPages: number = useMemo((): number => {
    if (items.length === 0 || itemsPerPage <= 0) {
      return 0;
    }

    const newPageCount: number = Math.ceil(items.length / itemsPerPage);
    return newPageCount;
  }, [items.length, itemsPerPage]);

  const currentPage: number = totalPages > 0 ? Math.min(page, totalPages) : page;

  const paginatedItems: any = useMemo(() => {
    if (items.length === 0) {
      return [];
    }

    const pageIndex: number = currentPage - 1;
    const windowStart: number = pageIndex * itemsPerPage;
    const windowEnd: number = windowStart + itemsPerPage;

    return items.slice(windowStart, windowEnd);
  }, [items, currentPage, itemsPerPage])

  const setCurrentPage = (page: number): void => {
    if (page < DEFAULT_FIRST_PAGE || page > totalPages) {
      return;
    }

    setPage(page)
  }

  const resetToFirstPage = () => {
    setPage(DEFAULT_FIRST_PAGE);
  }

  const showPaginationControls: boolean = totalPages > 1;

  return {
    totalPages,
    currentPage,
    paginatedItems,
    setCurrentPage,
    resetToFirstPage,
    showPaginationControls
  }
}

export {
  useTablePaginate
}