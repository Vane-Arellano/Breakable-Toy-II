import { handleDetailsRedirect } from "@/app/_handlers/resultsComponentHandler"
import { Card, CardContent } from "@/components/ui/card"
import { FlightCardContent } from "./flight-card-content"
import { Airport } from "@/app/_interfaces/airport"
import { useState, useEffect } from "react"
import { formatFlightDuration, getDepartureInfo, getReturnInfo } from "../_utils/utils"
import { Separator } from "@/components/ui/separator"
import { useDispatch } from "react-redux"
import { RoundFlightI } from "@/app/_interfaces/round-flight"

export const RoundFlightComponent = (props: {flight: RoundFlightI}) => {
    const [allAirports, setAllAirports] = useState<Record<string, Airport> | null>(null);
    const dispatch = useDispatch(); 

    const departureInfo = getDepartureInfo(props.flight); 
    const returnInfo = getReturnInfo(props.flight); 

    useEffect(() => {
        fetch("/cleaned_airports.json")
            .then((res) => res.json())
            .then((data) => setAllAirports(data))
            .catch((err) => console.error("Failed to load airport data", err));
    }, []);
    const getAirportState = (airportCode: string) => {
        if (!allAirports || !airportCode) return null;
        
        const airport = allAirports[airportCode.toUpperCase()];
        return airport ? airport.state : null; // Return state if found, otherwise null
    };

    // Get the states of the departure flight 
    const departureState = getAirportState(departureInfo.departureAirport) ?? "";
    const arrivalState = getAirportState(departureInfo.arrivalAirport) ?? "";
    const flightDuration = formatFlightDuration(departureInfo.flightDuration) ?? "";

    // Get the states of the return flight 
    const returnDepartureState = getAirportState(returnInfo.returnDepartureAirport) ?? "";
    const returnArrivalState = getAirportState(returnInfo.returnArrivalAirport) ?? "";
    const returnFlightDuration = formatFlightDuration(returnInfo.returnFlightDuration) ?? "";
    return (
        <button key={departureInfo.departureId} className="mb-4 w-full" onClick={() => handleDetailsRedirect(departureInfo.departureId, dispatch)}>
            <Card className="w-full bg-zinc-200/25 h-fit hover:bg-slate-300/25">
                <CardContent className="flex flex-col justify-between gap-4">
                    <FlightCardContent
                        departureDateTime = {departureInfo.departureDateTime.split('T')[1]}
                        departureAirport = {departureInfo.departureAirport}
                        departureState = {departureState}
                        airlineCode = {departureInfo.airlineCode}
                        arrivalDateTime = {departureInfo.arrivalDateTime.split('T')[1]} 
                        arrivalAirport = {departureInfo.arrivalAirport}
                        arrivalState = {arrivalState}
                        flightDuration = {flightDuration} 
                        stops = {departureInfo.stops}
                        totalPrice = {departureInfo.totalPrice}
                        pricePerTraveler = {departureInfo.pricePerTraveler ?? ""}
                    
                    />
                    <Separator orientation="horizontal" className="w-full"/>
                    <FlightCardContent
                        departureDateTime = {returnInfo.returnDepartureDateTime.split('T')[1]}
                        departureAirport = {returnInfo.returnDepartureAirport}
                        departureState = {returnDepartureState}
                        airlineCode = {returnInfo.returnAirlineCode}
                        arrivalDateTime = {returnInfo.returnArrivalDateTime.split('T')[1]} 
                        arrivalAirport = {returnInfo.returnArrivalAirport}
                        arrivalState = {returnArrivalState}
                        flightDuration = {returnFlightDuration} 
                        stops = {returnInfo.returnStops}
                        totalPrice = {returnInfo.returnTotalPrice}
                        pricePerTraveler = {returnInfo.returnPricePerTraveler ?? ""}
                    
                    />
                </CardContent>
            </Card>
        </button>
    )
}