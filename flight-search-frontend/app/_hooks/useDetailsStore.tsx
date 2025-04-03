
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { FlightOffer } from "../_interfaces/flights-general";


const getFlightById = (state: RootState, flightId: string): FlightOffer | undefined => {
  // Check regular flights first
  const regularFlight = state.results.flights.find(flight => flight.id === flightId);
  if (regularFlight) return regularFlight;

  // Check round flights (both departure and return)
  for (const roundFlight of state.results.roundFlights) {
    if (roundFlight.departureFlight.id === flightId) return roundFlight.departureFlight;
    if (roundFlight.returnFlight.id === flightId) return roundFlight.returnFlight;
  }

  return undefined;
};

export const useDetailsStore = () => {
  const details = useSelector((state: RootState) => state.details.details);
  const errorF = useSelector((state: RootState) => state.details.error);
  const flightId = details.id;

  const flight = useSelector((state: RootState) => 
    getFlightById(state, flightId)
  );

  const price = flight?.totalPrice ?? { grandTotal: "0", currency: 'USD', base: "", fees: [] };
  const pricePerTraveler = flight?.pricePerTraveler ?? { grandTotal: "0", currency: 'USD', base: "", fees: [] };

  return { 
    details, 
    errorF, 
    price,
    pricePerTraveler,
    flight // Optional: return the full flight object if needed elsewhere
  };
};