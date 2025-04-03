import { FlightOffer } from "./flights-general";

export interface RoundFlightI {
    departureFlight: FlightOffer, 
    returnFlight: FlightOffer
}