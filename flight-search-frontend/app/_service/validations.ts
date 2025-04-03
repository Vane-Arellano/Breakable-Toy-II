
export const validRequiredParameters = (origin: string, destination:string, departureDate:string) => {
    if (!origin || !destination || !departureDate) {
        return false
    }
    return true
} 

export const existsItineraryId = (itineraryId: string) => {
    if (!itineraryId) {
        return false
    }
    return true
}

export const apiUrlConfigured = (api_url: string | undefined) => {
    if (!api_url) {
        return false
    }
    return true
} 