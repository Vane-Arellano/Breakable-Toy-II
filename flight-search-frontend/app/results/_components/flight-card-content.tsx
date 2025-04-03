import { PriceI } from "@/app/_interfaces/price"
import { StopI } from "@/app/_interfaces/stop"
import { PlaneTakeoffIcon, PlaneIcon, PlaneLandingIcon } from "lucide-react"

export const FlightCardContent = ({
  departureDateTime, 
  departureAirport, 
  departureState, 
  airlineCode, 
  arrivalDateTime, 
  arrivalAirport, 
  arrivalState, 
  flightDuration, 
  stops, 
  totalPrice, 
  pricePerTraveler

}: {
  departureDateTime : string, 
  departureAirport : string, 
  departureState : string, 
  airlineCode : string, 
  arrivalDateTime : string, 
  arrivalAirport : string, 
  arrivalState : string, 
  flightDuration : string, 
  stops : StopI[], 
  totalPrice: PriceI, 
  pricePerTraveler: string
}) => {
  return (
    <>
    <div className="flex flex-row justify-between">
      <div className="departure text-left">
        <PlaneTakeoffIcon size={20} className="text-blue-500" />
        <p className="text-xl font-semibold">{departureDateTime}</p>
        <p>({departureAirport}) {departureState}</p>
      </div>
      <div className="middle-space flex flex-row justify-center items-center gap-4">
        <div className="w-50 h-[2px] bg-blue-800/25"></div>
        <div className="flex flex-col justify-center items-center">
          <PlaneIcon size={30} className="text-blue-800/50" />
          <p>{airlineCode}</p>
        </div>
        <div className="w-50 h-[2px] bg-blue-800/25"></div>

      </div>
      <div className="arrival flex flex-col text-right items-right">
        <PlaneLandingIcon size={20} className="text-blue-500 self-end" />
        <p className="text-xl font-semibold">{arrivalDateTime}</p>
        <p>({arrivalAirport}) {arrivalState}</p>
      </div>
    </div><div className="bottom-section flex flex-row justify-between">
        <div className="flex flex-col text-left text-sm text-slate-600/75">
          <p>{flightDuration} ({stops.length} stops)</p>
          {stops ?
            stops.map((stop: StopI, index: number) => (
              <p key={index}>{stop.duration} in {stop.iataCode}</p>
            ))
            : null}
        </div>
        <div className="flex flex-row justify-start gap-8">
          <div className="flex flex-col">
            <p className="font-bold text-lg text-blue-800">{totalPrice.grandTotal} {totalPrice.currency}</p>
            <p className="text-sm text-slate-600/75">total</p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-lg text-blue-800">{pricePerTraveler} {totalPrice.currency}</p>
            <p className="text-sm text-slate-600/75">per person</p>
          </div>
        </div>

      </div>
    </>

  )

}