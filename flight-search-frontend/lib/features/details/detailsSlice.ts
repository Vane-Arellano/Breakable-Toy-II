import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { detailsInitialState } from "./detailsState";
import { FlightDetailsI } from "@/app/_interfaces/flight-details";

export const detailsSlice = createSlice({
    name: "details",
    initialState: detailsInitialState,
    reducers: {
        setLoading: (state) => {
            state.loading = true
        },
        fetchDetailsSuccess: (state, action: PayloadAction<FlightDetailsI>) => {
            state.details = action.payload;
            state.loading = false;
            state.error = "";
        },
        fetchDetailsFailure: (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
        },
        resetDetails: () => detailsInitialState
    },
  });