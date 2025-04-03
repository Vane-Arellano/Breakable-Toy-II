import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { flightsResultInitialState,  } from "./resultsState";
import { FlightOffer } from "@/app/_interfaces/flights-general";
import { RoundFlightI } from "@/app/_interfaces/round-flight";

export const flightsSlice = createSlice({
    name: "flights",
    initialState: flightsResultInitialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true
        },
        setItineraries: (state, action: PayloadAction<FlightOffer[]>) => {
            state.flights = action.payload; 
            state.loading = false
        },
        setRoundFlights: (state, action: PayloadAction<RoundFlightI[]>) => {
            state.roundFlights = action.payload
            state.loading = false
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false
        },
        resetItinerary: () => flightsResultInitialState
        
    },
  });