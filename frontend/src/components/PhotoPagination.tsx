import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Meta } from "@/types";
import { FC } from "react";

type Props = {
  meta: Meta;
};

const PhotoPagination: FC<Props> = ({ meta }) => {
  const { page, pageSize, pageCount, total } = meta.pagination;
  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`/?page=${page - 1}`} />
          </PaginationItem>
        )}
        {page - 2 >= 1 && (
          <PaginationItem>
            <PaginationLink href={`/?page=${page - 2}`}>{page - 2}</PaginationLink>
          </PaginationItem>
        )}
        {page - 1 >= 1 && (
          <PaginationItem>
            <PaginationLink href={`/?page=${page - 1}`}>{page - 1}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href={`/?page=${page}`} className="font-bold underline">
            {page}
          </PaginationLink>
        </PaginationItem>
        {page + 1 <= pageCount && (
          <PaginationItem>
            <PaginationLink href={`/?page=${page + 1}`}>{page + 1}</PaginationLink>
          </PaginationItem>
        )}
        {page + 2 <= pageCount && (
          <PaginationItem>
            <PaginationLink href={`/?page=${page + 2}`}>{page + 2}</PaginationLink>
          </PaginationItem>
        )}
        {page < pageCount && (
          <PaginationItem>
            <PaginationNext href={`/?page=${page + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PhotoPagination;
