import { toast } from "sonner";
import { apiUrlConfigured, existsItineraryId, validRequiredParameters } from "./validations";

const api_url = process.env.NEXT_PUBLIC_API_URL;

export const getFlights = async (
    origin: string, destination:string, 
    departureDate:string, returnDate: string, 
    adults:string, currency:string, nonStop:boolean, 
    sortBy: string, sortOrder: string
) => {
    try {
        // firsts validations
        if(!validRequiredParameters(origin, destination, departureDate)) toast("Missing required parameters") 
        if(!apiUrlConfigured(api_url)) throw new Error('API URL is not configured');
        

        // Construct URL with URLSearchParams for proper encoding
        const params = new URLSearchParams({
            origin,
            destination,
            departureDate,
            returnDate,
            adults: adults.toString(),
            currency,
            nonStop: nonStop.toString(),
            sortBy: sortBy,
            sortOrder: sortOrder
        });

        

        const url = `${api_url}?${params.toString()}`;

        const response = await fetch(url);

        // Check if response is OK (status 200-299)
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                `API request failed with status ${response.status}: ${JSON.stringify(errorData)}`
            );
        }

        const flights = await response.json();
    
        // Validate response structure
        if (!flights || !Array.isArray(flights)) {
            toast("Non valid format received")
            throw new Error('Invalid response format from API');
        }

        if (flights.length == 0){
            toast('Flights not found for search criteria')
        }

        return flights;

    

    } catch(error){
        if (error instanceof Error) {
            toast('Server did not respond, try again later')
            // console.error('Failed to fetch flights:', error.message);
        }
        toast('An unexpected error occurred during flight search');
    }
}

export const getFlightDetails = async (itineraryId: string) => {
    try {
        if (!existsItineraryId(itineraryId)) toast("Something went wrong, please try again")
        if (!apiUrlConfigured(api_url)) throw new Error('API URL is not configured');
    
        const url = `${api_url}/details/${itineraryId}`;
        const response = await fetch(url);
    
        // Check if response is OK (status 200-299)
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                `API request failed with status ${response.status}: ${JSON.stringify(errorData)}`
            );
        }
        const details = await response.json();
        return details
        
    } catch (error) {
        if (error instanceof Error) {
            console.error('Failed to fetch flight details:', error.message);
            throw new Error(`Flight details failed: ${error.message}`);
        }
        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred during flight details fetch');
    }
    
}