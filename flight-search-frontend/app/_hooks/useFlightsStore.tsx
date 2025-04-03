// src/hooks/useSearchParams.ts
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export const useFlightsStore = () => {
  const loading = useSelector((state: RootState) => state.results.loading)
  const itineraries = useSelector((state: RootState) => state.results.flights);
  const errorF = useSelector((state: RootState) => state.results.error);
  const roundedFlights = useSelector((state: RootState) => state.results.roundFlights)
  return { itineraries, errorF, loading, roundedFlights };
};
