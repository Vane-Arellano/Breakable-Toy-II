export interface Amenity {
    amenity: string, 
    chargable: boolean
}
export interface Segment {
    flight_number: string, 
    aircraft_type: string, 
    airline: string, 
    departure_airport: string,
    departure_date: string, 
    departure_time: string, 
    arrival_airport: string,
    arrival_date: string, 
    arrival_time: string,
    cabin: string, 
    class: string, 
    amenities: Amenity[], 
}

export const Segments : Segment[] = [
    { 
        flight_number: "Flight 212", 
        aircraft_type: "AIRBUS A321", 
        airline: "Aeromexico (AM)", 
        departure_airport: "Aguascalientes (AGS)",
        departure_date: "2025-07-06", 
        departure_time: "15:48", 
        arrival_airport: "Ciudad de Mexico (MEX)",
        arrival_date: "2025-07-06", 
        arrival_time: "17:05",
        cabin: "ECONOMY", 
        class: "E", 
        amenities: [
            {
                amenity: "drinks", 
                chargable: false,
            }, 
            {
                amenity: "streaming", 
                chargable: false,
            }, 
            {
                amenity: "snack", 
                chargable: false,
            }
        ], 
    }, 
    { 
        flight_number: "Flight 212", 
        aircraft_type: "AIRBUS A321", 
        airline: "Aeromexico (AM)", 
        departure_airport: "Ciudad de Mexico (MEX)",
        departure_date: "2025-07-06", 
        departure_time: "15:48", 
        arrival_airport: "Rome, Italy (FCO)",
        arrival_date: "2025-07-06", 
        arrival_time: "17:05",
        cabin: "ECONOMY", 
        class: "E", 
        amenities: [
            {
                amenity: "drinks", 
                chargable: false,
            }, 
            {
                amenity: "streaming", 
                chargable: false,
            }, 
            {
                amenity: "snack", 
                chargable: false,
            }
        ], 
    }, 
    { 
        flight_number: "Flight 212", 
        aircraft_type: "AIRBUS A321", 
        airline: "Aeromexico (AM)", 
        departure_airport: "Rome, Italy (FCO)",
        departure_date: "2025-07-06", 
        departure_time: "15:48", 
        arrival_airport: "Geneva, Suiza (GVA)",
        arrival_date: "2025-07-06", 
        arrival_time: "17:05",
        cabin: "ECONOMY", 
        class: "E", 
        amenities: [
            {
                amenity: "drinks", 
                chargable: false,
            }, 
            {
                amenity: "streaming", 
                chargable: false,
            }, 
            {
                amenity: "snack", 
                chargable: false,
            }
        ], 
    }

]