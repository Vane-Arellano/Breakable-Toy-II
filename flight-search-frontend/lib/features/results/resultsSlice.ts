import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { flightsInitialState,  } from "./resultsState";
import { Flight } from "@/app/_interfaces/flights-general";

const flightsSlice = createSlice({
    name: "flights",
    initialState: flightsInitialState,
    reducers: {
        setSegments: (state, action: PayloadAction<Flight[]>) => {
            state.flights = action.payload; 
        },
        addSegments: (state, action: PayloadAction<Flight[]>) => {
        state.flights.push(...action.payload); 
        },
        resetSegments: () => flightsInitialState
    },
  });