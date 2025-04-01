export const getFlights = async (origin: string, destination:string, departureDate:string, adults:number, currency:string, nonStop:boolean) => {
    const api_url = process.env.NEXT_PUBLIC_API_URL
    const url = `${api_url}?origin=${origin}&destination=${destination}&departureDate=${departureDate}&adults=${adults}&currency=${currency}&nonStop=${nonStop}`
    const response = await fetch(url); 
    const flights = await response.json()
    return flights
}
