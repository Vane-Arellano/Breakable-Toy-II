import { flightDetails } from "@/app/_interfaces/flight-details"

export const segmentInitialState: flightDetails = {
    segmentId: 0,
    cabin: "", 
    classType: "",
    deperture_time: "",
    amanities: [], 
}

export const detailsInitialState = {
    segments : [] as flightDetails[]
}