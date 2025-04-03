import { Card, CardContent } from "@/components/ui/card"
import { SegmentI } from "@/app/_interfaces/segment"
import { AmenitiesI } from "@/app/_interfaces/amenities"
import { useEffect, useState } from "react"
import { formatDateTime } from "@/app/results/_utils/utils"
import { Airport } from "@/app/_interfaces/airport"

export const SegmentComponent = (props: {segment: SegmentI}) => {
  const [allAirports, setAllAirports] = useState<Record<string, Airport> | null>(null);
  
  const departureDateTime = formatDateTime(props.segment.departure.at); 
  const arrivalDateTime = formatDateTime(props.segment.arrival.at); 

  const getAirportState = (airportCode: string) => {
    if (!allAirports || !airportCode) return null;
    
    const airport = allAirports[airportCode.toUpperCase()];
    return airport ? airport.state : null; // Return state if found, otherwise null
};

  const departureCity = getAirportState(props.segment.departure.iataCode)
  const arrivalCity = getAirportState(props.segment.arrival.iataCode)

  useEffect(() => {
    fetch("/cleaned_airports.json")
      .then((res) => res.json())
      .then((data) => setAllAirports(data))
      .catch((err) => console.error("Failed to load airport data", err));
  }, []);

  


  return (
    <>
    <Card className="w-full border bg-white h-[200px]">
      <CardContent className="flex flex-row justify-between gap-4 h-fit">
        <div className="flex flex-col gap-5">
          <div className="flex flex-row justify-between gap-2">
            <p className="font-semibold">{props.segment.flightNumber}</p>
            <p className="font-semibold">{props.segment.aircraftCode}</p>
            <p className="font-semibold">{props.segment.carrierCode}</p>
          </div>
          <p>{departureDateTime} - {arrivalDateTime}</p>
          <p>{departureCity} {props.segment.departure.iataCode} - {arrivalCity} {props.segment.arrival.iataCode}</p>
          {
            props.segment.carrierCode !== props.segment.operationCarrierCode &&
            props.segment.operationCarrierCode !== " "
            ? 
            <p>Operated by: {props.segment.operationCarrierCode}</p>
            : null
          }
          <div className="flex flex-row gap-5">
          </div>
        </div>
        <div className="border border-blue-200 rounded-lg p-2 flex flex-col justify-between max-h-1/2 w-fit overflow-y-scroll gap-1 px-8">
          <p className="text-sm font-semibold">
            Travelers Fare Details
          </p>
          <div className="flex flex-row justify-between">
            <p className="text-sm">Cabin</p>
            <p className="text-sm">{props.segment.travelerFareDetailsDTO.cabin}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-sm">Class</p>
            <p className="text-sm">{props.segment.travelerFareDetailsDTO.fclass}</p>
          </div>
          <p className="text-sm font-semibold">
            Amenities
          </p>
          {
            props.segment.travelerFareDetailsDTO.amenities.map((amenity: AmenitiesI, index: number) => (
              <div key={index} className="flex flex-row justify-between">
                <p className="text-sm">{amenity.amenityDecription}</p>
                <p className="text-sm">{amenity.isChargeable  ? "Yes" : "No"}</p>
              </div>
            ))
        }
        </div>
      </CardContent>
    </Card>
    </>

  )
}