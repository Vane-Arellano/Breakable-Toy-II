import { FlightSearch } from "@/app/_interfaces/flight-search";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchInitialState } from "./searchState";

export const searchSlice = createSlice({
    name: "search",
    initialState: searchInitialState,
    reducers: {
      setSearchParams: (state, action: PayloadAction<Partial<FlightSearch>>) => {
        return { ...state, ...action.payload };
      },
      resetSearch: () => searchInitialState,
    },
  });