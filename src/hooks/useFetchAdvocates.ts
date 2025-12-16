import { AdvocateQuery, AdvocateResponse } from "@/types/advocate";
import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

export default function useFetchAdvocates(initialPageParam?: number) {
    const { ref, inView } = useInView({
        threshold: 0.1,
    })
    const [filters, setFilters] = useState<AdvocateQuery>({});
  
    const { fetchNextPage, hasNextPage, data } = useInfiniteQuery({
    queryKey: ['advocates', filters],
    queryFn: async ({ pageParam }: { pageParam?: number | undefined }) => {
      const response = await fetch("/api/advocates", { 
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({page: pageParam, ...filters}) 
      })
      return response.json() as Promise<AdvocateResponse>;
    },
    initialPageParam,
    getNextPageParam: (lastPage) => lastPage.page + 1,
    enabled: true,
  })

  useEffect(() => {
    if (inView) {
      fetchNextPage().catch((e: unknown) => console.error(e))
    }
  }, [inView, fetchNextPage])

  return { ref, hasNextPage, pages: data?.pages, setFilters };
}
