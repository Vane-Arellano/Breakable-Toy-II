import { AmenitiesI } from "./amenities";

export interface FareDetailsI {
    segmentId: string, 
    cabin: string, 
    fclass: string,
    amenities: AmenitiesI[]
}
