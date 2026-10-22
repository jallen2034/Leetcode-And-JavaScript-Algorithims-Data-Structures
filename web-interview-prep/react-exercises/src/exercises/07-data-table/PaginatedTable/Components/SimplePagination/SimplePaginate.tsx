import "./SimplePaginate.scss";

interface SimplePaginateProps {
  totalPages: number,
  currentPage: number,
  setCurrentPage: (page: number) => void,
}

export const SimplePaginate = ({
  totalPages,
  currentPage,
  setCurrentPage
}: SimplePaginateProps) => {
  const handleNext = () => {
    const nextPageNumber: number = currentPage + 1;
    setCurrentPage(nextPageNumber);
  }

  const handlePrevious = () => {
    const prevPageNumber: number = currentPage - 1;
    setCurrentPage(prevPageNumber);
  }

  return (
    <div className="pagination-container">
      <button
        className="btn-nav"
        onClick={() => handlePrevious()}
      >
        Prev
      </button>

      <div className="page-indicator">
        {currentPage} / {totalPages}
      </div>

      <button
        className="btn-nav"
        onClick={() => handleNext()}
      >
        Next
      </button>
    </div>
  );
}