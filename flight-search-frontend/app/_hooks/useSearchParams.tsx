// src/hooks/useSearchParams.ts
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export const useSearchParams = () => {
  const departureDate = useSelector((state: RootState) => state.search.departure_date);
  const returnDate = useSelector((state: RootState) => state.search.return_date);
  const origin = useSelector((state: RootState) => state.search.departure_airport);
  const destination = useSelector((state: RootState) => state.search.arrival_airport);
  const currency = useSelector((state: RootState) => state.search.currency);
  const nonStopS = useSelector((state: RootState) => state.search.non_stop);

  return { departureDate, returnDate, origin, destination, currency, nonStopS };
};
