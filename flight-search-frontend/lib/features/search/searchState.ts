import { FlightSearch } from "@/app/_interfaces/flight-search";

export const searchInitialState: FlightSearch = {
    departure_airport: "",
    arrival_airport: "",
    departure_date: "",
    return_date: "",
    currency: "USD",
    non_stop: false,
  };
  