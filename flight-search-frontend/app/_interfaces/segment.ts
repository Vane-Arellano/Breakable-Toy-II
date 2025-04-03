import { FareDetailsI } from "./fare-details";
import { LocationI } from "./location";

export interface SegmentI {
    departure: LocationI,
    arrival: LocationI, 
    carrierCode: string, 
    operationCarrierCode: string, 
    flightNumber: string, 
    aircraftCode: string, 
    travelerFareDetailsDTO: FareDetailsI

}