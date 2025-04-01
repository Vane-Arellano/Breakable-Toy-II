import { searchSlice } from "@/lib/features/search/searchSlice";
import { AppDispatch } from "@/lib/store"; // Import your Redux store's dispatch type
import { getFlights } from "../_service/flights";
import { FlightSearch } from "../_interfaces/flight-search";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";


export const handleSubmit = async (
  event: React.FormEvent,
  searchParams: Partial<FlightSearch>, // Replace with your actual type
  dispatch: AppDispatch,
  router: AppRouterInstance,
  flightSearch : FlightSearch
) => {

  event.preventDefault();
  dispatch(searchSlice.actions.setSearchParams(searchParams));
  const res = await getFlights(
    flightSearch.departure_airport, 
    flightSearch.arrival_airport, 
    flightSearch.departure_date, 
    1, 
    flightSearch.currency, 
    flightSearch.non_stop);

  console.log('Results', res)
  router.push("/results");
};

export const handleNonStop = (value: number, dispatch: AppDispatch) => {
  if (!value) return; 

  if (value === 0) {
    dispatch(searchSlice.actions.setSearchParams({ non_stop: false }));
  } else {
    dispatch(searchSlice.actions.setSearchParams({ non_stop: true }));
  }
  
};

export const handleCurrencyChange = (value: string, dispatch: AppDispatch) => {
  if (!value) return; 

  dispatch(searchSlice.actions.setSearchParams({ currency: value }));
};

export const handleSelectAirportChange = (value: string, dispatch: AppDispatch, departure: boolean, setSelectedValue: Dispatch<SetStateAction<string | null>>) => {
  if (!value) return; 

  if (departure) {
    dispatch(searchSlice.actions.setSearchParams({ departure_airport: value }))
    setSelectedValue(value)
  } else {
    dispatch(searchSlice.actions.setSearchParams({ arrival_airport: value }));
    setSelectedValue(value)
  }
}

export const handleDateChange = (value: Date | undefined, dispatch: AppDispatch, departure: boolean, setDate: Dispatch<SetStateAction<Date | undefined>>) => {
  let stringDate = "";
  if(value){ 
    stringDate = value.toISOString().split('T')[0]
    setDate(value)
  }
  
  dispatch(searchSlice.actions.setSearchParams(
    departure ? { departure_date: stringDate } : { return_date: stringDate }
  ));
};