import { ItineraryI } from "@/app/_interfaces/itinerary"



export const initialState = {
    id: "",
    itineraries: {
        duration: "", 
        segments: []
    } as ItineraryI,
    timeBetween: [] as string[]
}

export const detailsInitialState = {
    details: initialState,
    loading: false,
    error: ""
}
