'use client'
import { Card, CardContent } from "@/components/ui/card"
import { FlightOffer } from "@/app/_interfaces/flights-general"
import { useState, useEffect } from "react"
import { Airport } from "@/app/_interfaces/airport"
import { formatFlightDuration } from "../_utils/utils"
import { handleDetailsRedirect } from "@/app/_handlers/resultsComponentHandler"
import { useDispatch } from "react-redux"
import { useDetailsStore } from "@/app/_hooks/useDetailsStore"
import { useRouter } from "next/navigation"
import { FlightCardContent } from "./flight-card-content"

export const FlightComponent = (props: {flight: FlightOffer}) => {
    const dispatch = useDispatch();
    const [allAirports, setAllAirports] = useState<Record<string, Airport> | null>(null);
    const { details } = useDetailsStore();
    const segments = details.itineraries.segments
    const router = useRouter();
    
    useEffect(() => {
        fetch("/cleaned_airports.json")
          .then((res) => res.json())
          .then((data) => setAllAirports(data))
          .catch((err) => console.error("Failed to load airport data", err));
    }, []);

    useEffect(() => {
        if(segments !== undefined && segments.length > 0) router.push("/details");
    }, [segments, router])


    const getAirportState = (airportCode: string) => {
        if (!allAirports || !airportCode) return null;
        
        const airport = allAirports[airportCode.toUpperCase()];
        return airport ? airport.state : null; // Return state if found, otherwise null
    };

    const departureState = getAirportState(props.flight.departureAirport) ?? "";
    const arrivalState = getAirportState(props.flight.arrivalAirport) ?? "";
    const flightDuration = formatFlightDuration(props.flight.flightDuration) ?? "";

    return (
        <button key={props.flight.id} className="mb-4 w-full" onClick={() => handleDetailsRedirect(props.flight.id, dispatch)}>
            <Card className="w-full bg-zinc-200/25 h-fit hover:bg-slate-300/25">
                <CardContent className="flex flex-col justify-between gap-4">
                    <FlightCardContent
                        departureDateTime = {props.flight.departureDatTime.split('T')[1]}
                        departureAirport = {props.flight.departureAirport}
                        departureState = {departureState}
                        airlineCode = {props.flight.airlineCode}
                        arrivalDateTime = {props.flight.arrivalDateTime.split('T')[1]} 
                        arrivalAirport = {props.flight.arrivalAirport}
                        arrivalState = {arrivalState}
                        flightDuration = {flightDuration} 
                        stops = {props.flight.stops}
                        totalPrice = {props.flight.totalPrice}
                        pricePerTraveler = {props.flight.pricePerTraveler?.grandTotal ?? ""}
                    
                    />
                </CardContent>
            </Card>
        </button>
    )
}