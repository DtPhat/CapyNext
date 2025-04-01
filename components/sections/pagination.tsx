"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { usePathname } from "next/navigation"

interface PaginationWrapperProps {
  currentPage: number
  totalPages: number
  searchParams?: Record<string, string | number | undefined>,
  className?: string
}

export function PaginationWrapper({
  currentPage,
  totalPages,
  searchParams = {},
  className = "mt-8"
}: PaginationWrapperProps) {
  const pathname = usePathname()

  const generateHref = (page: number) => {
    const params = new URLSearchParams(searchParams as Record<string, string>)
    params.set("page", page.toString())
    return `${pathname}?${params.toString()}`
  }

  // Build pagination range logic here (can extract to helper)
  const paginationRange = getPaginationRange(currentPage, totalPages)

  return (
    <Pagination className={className}>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={generateHref(currentPage - 1)} />
          </PaginationItem>
        )}
        {paginationRange.map((page, index) =>
          page === "ellipsis" ? (
            <PaginationItem key={index}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={index}>
              <PaginationLink href={generateHref(page)} isActive={page == currentPage}>
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        )}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={generateHref(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}


function getPaginationRange(current: number, total: number): (number | "ellipsis")[] {
  const delta = 2
  const range: (number | "ellipsis")[] = []
  let l: number = -1

  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      if (l !== -1 && i - l > 2) {
        range.push("ellipsis")
      } else if (l !== -1 && i - l === 2) {
        range.push(l + 1)
      }
      range.push(i)
      l = i
    }
  }

  return range
}
