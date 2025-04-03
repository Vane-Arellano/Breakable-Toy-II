import { FlightOffer } from "@/app/_interfaces/flights-general"
import { PriceI } from "@/app/_interfaces/price"
import { RoundFlightI } from "@/app/_interfaces/round-flight"

export interface Stop { 
    stop_time: string
    stop_airport: string 
}

const initialPrice : PriceI = {
    currency: "USD", 
    base: "", 
    grandTotal: "", 
    fees: []
}
export const flightInitialState: FlightOffer = {
    id: "",
    departureDatTime: "", // ISO 8601 format recommended: "2023-12-25T15:30:00"
    arrivalDateTime: "",
    departureAirport: "", // IATA code like "JFK"
    arrivalAirport: "",
    airlineCode: "", 
    operatingAirlineCode: "", // Optional if different from marketing airline
    flightDuration: "", // ISO 8601 duration format "PT2H30M"
    stops: [],
    totalPrice: initialPrice,
    pricePerTraveler: initialPrice, 
}

export const flightsResultInitialState = {
    loading: false,
    flights: [] as FlightOffer[],
    roundFlights: [] as RoundFlightI[],
    error: ""
}