"use client"

import PropertyCard from "@/components/Property-Card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { formatNumberEn } from "@/lib/formatNumber"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { getPropertiesClientThunk } from "@/redux/slices/client/property-thunk"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"

const Property = () => {
  const dispatch = useAppDispatch();
  const {properties, isLoading} = useAppSelector((state) => state.propertiesClientSlice)

  useEffect(() => {
    dispatch(getPropertiesClientThunk())
  }, [dispatch])
  return (
    <main className="min-h-svh pt-[78px]">
      {isLoading ? (
        <div className="min-h-[calc(100svh-79px)] w-full flex justify-center items-center">
          <Loader2 size={50} className="animate-spin" />
        </div>
      ):(
        <>
          <div className="mb-12 px-6 md:px-10 xl:px-20">
            <h1 className="my-6 text-sm font-semibold">Found {formatNumberEn(1000)} places</h1>
            <div className="grid md:grid-cols-4 gap-x-6 gap-y-10">
              {properties.map((d) => (
                <PropertyCard key={d.id} data={d} />
              ))}
            </div>
          </div>
          <div className="mb-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </main>
  )
}

export default Property