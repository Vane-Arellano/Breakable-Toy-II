'use client'
import { FlightComponent } from "./flight-component"
import { useFlightsStore } from "@/app/_hooks/useFlightsStore"
import { FlightOffer } from "@/app/_interfaces/flights-general"
import { RoundFlightComponent } from "./round-flight-component"
import { RoundFlightI } from "@/app/_interfaces/round-flight"


export const FlightList = () => {

  
  const { itineraries, roundedFlights } = useFlightsStore()

  return (
    <div className="p-10 h-full max-h-[80vh] bg-white rounded-lg overflow-y-scroll">
      {
        itineraries.length > 0 ? 
          itineraries.map((flight: FlightOffer) => (
            <FlightComponent flight={flight} key={flight.id} />
          ))

         :
         roundedFlights.map((roundedFlight: RoundFlightI) => (
          <RoundFlightComponent flight={roundedFlight} key={roundedFlight.departureFlight.id}/>
         ))
      }
    </div>
  )

}