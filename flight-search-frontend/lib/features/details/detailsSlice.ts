import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { detailsInitialState } from "./detailsState";
import { flightDetails } from "@/app/_interfaces/flight-details";

const detailsSlice = createSlice({
    name: "details",
    initialState: detailsInitialState,
    reducers: {
        setSegments: (state, action: PayloadAction<flightDetails[]>) => {
            state.segments = action.payload; 
        },
        addSegments: (state, action: PayloadAction<flightDetails[]>) => {
        state.segments.push(...action.payload); 
        },
        resetSegments: () => detailsInitialState
    },
  });