"use client"
import { useEffect } from "react"
import { useSearchParams } from "../_hooks/useSearchParams"
import { FlightList } from "./_components/list-flights"
import { SortComponents } from "./_components/sort-components"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { handleReturnToSearch } from "../_handlers/resultsComponentHandler"
import { useDispatch } from "react-redux"

export default function ResultsPage () {
    const { departureDate, returnDate, origin, destination, currency, nonStopS, loading, error, adults, sortBy, sortOrder } = useSearchParams()
      useEffect(() => {
        console.log("Search Store", departureDate, returnDate, origin, destination, currency, nonStopS, loading, error, adults, sortBy, sortOrder)
      }, [departureDate, returnDate, origin, destination, currency, nonStopS, loading, error, adults, sortBy, sortOrder])
    const router = useRouter();
    const dispatch = useDispatch();
    return (
        <div className="px-18 py-10 h-screen bg-radial-[at_25%_25%] from-blue-200/25 to-cyan-500/25 to-100%">
            <button onClick={() => handleReturnToSearch(router, dispatch)}><ArrowLeft className="text-black"/> </button>
            <SortComponents/>
            <FlightList/>
        </div>
    )
}