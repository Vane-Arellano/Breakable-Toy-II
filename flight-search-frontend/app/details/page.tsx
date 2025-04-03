"use client"
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FlightDetails } from "./_components/details"
import { handleReturnToResults } from "../_handlers/detailsComponentHandler";

export default function DetailsPage () {
    const router = useRouter();

    return (
        <div className="p-18 h-screen bg-radial-[at_25%_25%] from-blue-900/25 to-cyan-400/25 to-100%">
            <button onClick={() => handleReturnToResults(router)}><ArrowLeft className="text-black"/> </button>
            <FlightDetails/> 
        </div>
    )
}