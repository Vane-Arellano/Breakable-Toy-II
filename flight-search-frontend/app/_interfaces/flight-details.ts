import { ItineraryI } from "./itinerary"

export interface FlightDetailsI {
    id: string, 
    itineraries: ItineraryI, 
    timeBetween: string[]

}