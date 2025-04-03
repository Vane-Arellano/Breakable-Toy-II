import { searchSlice } from "@/lib/features/search/searchSlice";
import { flightsSlice } from "@/lib/features/results/resultsSlice";
import { AppDispatch } from "@/lib/store"; // Import your Redux store's dispatch type
import { getFlights } from "../_service/flights";
import { FlightSearch } from "../_interfaces/flight-search";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { FlightOffer } from "../_interfaces/flights-general";
import { RoundFlightI } from "../_interfaces/round-flight";


export const handleSubmit = async (
  event: React.FormEvent,
  dispatch: AppDispatch,
  flightSearch : FlightSearch, 
) => {

  event.preventDefault();

  dispatch(searchSlice.actions.setLoading());

  try {
    const res: FlightOffer[] | RoundFlightI[] = await getFlights(
      flightSearch.departure_airport, 
      flightSearch.arrival_airport, 
      flightSearch.departure_date, 
      flightSearch.return_date,
      flightSearch.adults, 
      flightSearch.currency, 
      flightSearch.non_stop,
      flightSearch.sortBy, 
      flightSearch.sortOrder
    ) as FlightOffer[] | RoundFlightI[];

    console.log('RESULTS: ', res)

    try {
      if (res != undefined){
        if(flightSearch.return_date !== ""){
          dispatch(flightsSlice.actions.setRoundFlights(res as RoundFlightI[]))
        } else {
          dispatch(flightsSlice.actions.setItineraries(res as FlightOffer[]))
        }
      }
    } catch (error) {
      dispatch(flightsSlice.actions.setError(error as string))
    }
    
  } catch (error) {
    console.log(error)
    toast('Something went wrong, please try again later')
  }
  
};

export const handleNonStop = (value: boolean, dispatch: AppDispatch) => {
  if (!value) return; 
  dispatch(searchSlice.actions.addSearchParam({ non_stop: value }));
};

export const handleCurrencyChange = (value: string, dispatch: AppDispatch) => {
  if (!value) return; 

  dispatch(searchSlice.actions.addSearchParam({ currency: value }));
};

export const handleSelectAirportChange = (value: string, dispatch: AppDispatch, departure: boolean, setSelectedValue: Dispatch<SetStateAction<string | null>>) => {
  if (!value) return; 

  if (departure) {
    dispatch(searchSlice.actions.addSearchParam({ departure_airport: value }))
    setSelectedValue(value)
  } else {
    dispatch(searchSlice.actions.addSearchParam({ arrival_airport: value }));
    setSelectedValue(value)
  }
}

export const handleDateChange = (value: Date | undefined, dispatch: AppDispatch, departure: boolean, setDate: Dispatch<SetStateAction<Date | undefined>>) => {
  let stringDate = "";
  if(value){ 
    stringDate = value.toISOString().split('T')[0]
    setDate(value)
  }
  
  dispatch(searchSlice.actions.addSearchParam(
    departure ? { departure_date: stringDate } : { return_date: stringDate }
  ));
};

export const handleAdultsChange = (e: React.ChangeEvent<HTMLInputElement>, dispatch: AppDispatch) => {
    dispatch(searchSlice.actions.addSearchParam(
      {adults: e.target.value}
    ));
}