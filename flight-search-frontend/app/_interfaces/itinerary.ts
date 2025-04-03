import { SegmentI } from "./segment";

export interface ItineraryI {
    duration: string, 
    segments: SegmentI[]
}