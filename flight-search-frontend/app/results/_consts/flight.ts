import { Flight } from "@/app/_interfaces/flights-general"
export const demoFlights: Flight[] = [
    {
        deperture_city: "San Francisco",
        deperture_code: "(SFO)",
        deperture_time: "7:30 AM", 
        deperture_day: "10-02-2025", 
        arraival_city: "Nueva York",
        arraival_code: "(JFK)", 
        arraival_time: "4:00 PM", 
        arraival_day: "10-02-2025", 
        airline: "Aeromexico",
        total_price: "1400", 
        currency: "USD", 
        price_per_person: "700", 
        number_stops: 1,
        total_time: "8h 17m", 
        stops: [{
            stop_time: "1h 3m", 
            stop_airport: "Los Angeles (LAX)"
        }]  
    }, 
    {
        deperture_city: "San Francisco",
        deperture_code: "(SFO)",
        deperture_time: "7:30 AM", 
        deperture_day: "10-02-2025", 
        arraival_city: "Nueva York",
        arraival_code: "(JFK)", 
        arraival_time: "4:00 PM", 
        arraival_day: "10-02-2025", 
        airline: "Aeromexico",
        total_price: "1400", 
        currency: "USD", 
        price_per_person: "700", 
        number_stops: 1,
        total_time: "8h 17m", 
        stops: [{
            stop_time: "1h 3m", 
            stop_airport: "Los Angeles (LAX)"
        }]  
    }, 
]