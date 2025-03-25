export interface Stop { 
    stop_time: string
    stop_airport: string 
}
export interface Flight {
    id: number
    deperture_city: string 
    deperture_code: string 
    deperture_time: string 
    deperture_day: string 
    arrival_city: string
    arrival_code: string 
    arrival_time: string 
    arrival_day: string 
    airline: string
    total_price: string 
    currency: string
    price_per_person: string 
    number_stops: number
    total_time: string 
    stops?: Stop[]
}