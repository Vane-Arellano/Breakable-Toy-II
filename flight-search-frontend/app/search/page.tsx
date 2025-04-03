"use client"

import { useEffect } from "react"
import { SearchForm } from "./_components/search-form"
import { useSearchParams } from "../_hooks/useSearchParams"

export default function SearchPage() {
  const { departureDate, returnDate, origin, destination, currency, nonStopS, loading, error, adults } = useSearchParams()
    useEffect(() => {
      console.log("Search Store", departureDate, returnDate, origin, destination, currency, nonStopS, loading, error, adults)
    }, [departureDate, returnDate, origin, destination, currency, nonStopS, loading, error, adults])
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-radial-[at_25%_25%] from-blue-200/25 to-cyan-500/25 to-100% p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <SearchForm/>
      </div>
    </div>
  )
}
