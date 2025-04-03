import { FlightSearch } from "@/app/_interfaces/flight-search";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchInitialState } from "./searchState";

export const searchSlice = createSlice({
    name: "search",
    initialState: searchInitialState,
    reducers: {
      setLoading: (state) => {
        state.loading = true
      },
      addSearchParam: (state, action: PayloadAction<Partial<FlightSearch>>) => {
        state.search = {
          ...state.search,
          ...action.payload,
        };
        state.loading = false
      },
      resetSearch: () => searchInitialState,
    },
  });