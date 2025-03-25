'use client'
import { FlightComponent } from "./flight-component"
import { demoFlights } from "../_consts/flight"
import { Flight } from "@/app/_interfaces/flights-general"
import { redirect } from "next/navigation"

export const FlightList = () => {

  const handleDetailsRedirect = async () => {
    // TODO: Call the API to get the details of the specific flight 
    redirect('/details')
  }

  return (
    <div className="p-10 h-full bg-white rounded-lg">
      {
        demoFlights.map((flight: Flight, index: number) => (
          <button key={index} className="mb-4 w-full" onClick={handleDetailsRedirect}>
            <FlightComponent flight={flight} />
          </button>
        ))
      }
    </div>
  )

}