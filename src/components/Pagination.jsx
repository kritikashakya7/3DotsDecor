import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, onPrevious, onNext }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={onPrevious}
        className="hover:bg-hover rounded border border-hover px-2 active:scale-95 animation"
      >
        <ChevronLeft />
      </button>
      <div className="bg-hover py-2 px-4 rounded">{page}</div>
      <button
        onClick={onNext}
        className="hover:bg-hover rounded border border-hover px-2 active:scale-95 animation"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
