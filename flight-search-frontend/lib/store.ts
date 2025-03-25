import { configureStore } from '@reduxjs/toolkit'
import { searchSlice } from './features/search/searchSlice'
import { flightsSlice } from './features/results/resultsSlice'
import { detailsSlice } from './features/details/detailsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      search: searchSlice.reducer, 
      results: flightsSlice.reducer, 
      details: detailsSlice.reducer
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']