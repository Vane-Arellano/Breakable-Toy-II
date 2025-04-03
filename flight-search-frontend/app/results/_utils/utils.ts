import { RoundFlightI } from "@/app/_interfaces/round-flight";

/**
 * Converts ISO 8601 duration (e.g., "PT15H10M") to human-readable format
 * @param durationString - ISO duration string
 * @returns Human-readable duration (e.g., "15 hours and 10 minutes")
 */
export function formatFlightDuration(durationString: string): string {
    // Extract hours and minutes using regex
    const matches = durationString.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    
    if (!matches) return "Unknown duration";
    
    const hours = parseInt(matches[1] || "0");
    const minutes = parseInt(matches[2] || "0");
  
    // Build human-readable parts
    const parts = [];
    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
  
    // Join with "and" if both exist
    return parts.length > 0 
      ? parts.join(' and ') 
      : 'Less than a minute';
  }

/**
 * Formats an ISO date string to YYYY-MM-DD HH:mm format
 * @param isoString - The ISO date string (e.g., "2025-07-07T18:40:00")
 * @returns Formatted date string in YYYY-MM-DD HH:mm format
 */
export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  
  // Get individual components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export function getDepartureInfo(flightInfo : RoundFlightI) {
  return {
    departureId: flightInfo.departureFlight.id,
    departureDateTime: flightInfo.departureFlight.departureDatTime,
    arrivalDateTime: flightInfo.departureFlight.arrivalDateTime,
    departureAirport: flightInfo.departureFlight.departureAirport,
    arrivalAirport: flightInfo.departureFlight.arrivalAirport,
    airlineCode: flightInfo.departureFlight.airlineCode,
    operatingAirlineCode: flightInfo.departureFlight.operatingAirlineCode,
    flightDuration: flightInfo.departureFlight.flightDuration,
    stops: flightInfo.departureFlight.stops,
    totalPrice: flightInfo.departureFlight.totalPrice,
    pricePerTraveler: flightInfo.departureFlight.pricePerTraveler?.grandTotal
  };
}

export function getReturnInfo(flightInfo : RoundFlightI){
  return {
    returnId: flightInfo.returnFlight.id,
    returnDepartureDateTime: flightInfo.returnFlight.departureDatTime,
    returnArrivalDateTime: flightInfo.returnFlight.arrivalDateTime,
    returnDepartureAirport: flightInfo.returnFlight.departureAirport,
    returnArrivalAirport: flightInfo.returnFlight.arrivalAirport,
    returnAirlineCode: flightInfo.returnFlight.airlineCode,
    returnOperatingAirlineCode: flightInfo.returnFlight.operatingAirlineCode,
    returnFlightDuration: flightInfo.returnFlight.flightDuration,
    returnStops: flightInfo.returnFlight.stops,
    returnTotalPrice: flightInfo.returnFlight.totalPrice,
    returnPricePerTraveler: flightInfo.returnFlight.pricePerTraveler?.grandTotal
  };
}