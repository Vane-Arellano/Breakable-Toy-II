import { PriceI } from "./price";
import { StopI } from "./stop";

export interface FlightOffer {
    id: string;
    departureDatTime: string; // ISO 8601 format recommended: "2023-12-25T15:30:00"
    arrivalDateTime: string;
    departureAirport: string; // IATA code like "JFK"
    arrivalAirport: string;
    airlineCode: string; // 2-letter IATA code like "AA"
    operatingAirlineCode?: string; // Optional if different from marketing airline
    flightDuration: string; // ISO 8601 duration format "PT2H30M"
    stops: StopI[];
    totalPrice: PriceI;
    pricePerTraveler?: PriceI; // Optional if different from grandTotal
  }