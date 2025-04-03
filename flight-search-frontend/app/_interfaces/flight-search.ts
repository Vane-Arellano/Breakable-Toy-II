export interface FlightSearch {
    departure_airport: string,
    arrival_airport: string,
    departure_date: string,
    return_date: string,
    currency: string,
    adults: string,
    non_stop: boolean
    sortBy: string, 
    sortOrder: string
}

export interface SearchStore {
    loading: boolean, 
    search: FlightSearch, 
    error: string
}