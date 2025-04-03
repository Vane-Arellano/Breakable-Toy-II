import { FlightSearch } from "@/app/_interfaces/flight-search";

const initialState: FlightSearch = {
  departure_airport: "",
  arrival_airport: "",
  departure_date: "",
  return_date: "",
  currency: "USD",
  adults: "1",
  non_stop: false,
  sortBy: "", 
  sortOrder: "",
}
export const searchInitialState = {
    loading: false,
    search: initialState,
    error: ""
  };
  