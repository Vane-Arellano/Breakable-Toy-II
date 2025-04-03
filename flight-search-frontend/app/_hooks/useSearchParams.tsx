// src/hooks/useSearchParams.ts
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export const useSearchParams = () => {
  const loading = useSelector((state: RootState) => state.search.loading)
  const departureDate = useSelector((state: RootState) => state.search.search.departure_date);
  const returnDate = useSelector((state: RootState) => state.search.search.return_date);
  const origin = useSelector((state: RootState) => state.search.search.departure_airport);
  const destination = useSelector((state: RootState) => state.search.search.arrival_airport);
  const currency = useSelector((state: RootState) => state.search.search.currency);
  const nonStopS = useSelector((state: RootState) => state.search.search.non_stop);
  const error = useSelector((state: RootState) => state.search.error)
  const adults = useSelector((state: RootState) => state.search.search.adults)
  const sortBy = useSelector((state: RootState) => state.search.search.sortBy)
  const sortOrder = useSelector((state: RootState) => state.search.search.sortOrder)



  return { departureDate, returnDate, origin, destination, currency, nonStopS, loading, error, adults, sortBy, sortOrder };
};
