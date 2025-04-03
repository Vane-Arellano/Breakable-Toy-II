import { redirect } from "next/navigation"
import { getFlightDetails } from "../_service/flights"
import { AppDispatch } from "@/lib/store";
import { toast } from "sonner";
import { detailsSlice } from "@/lib/features/details/detailsSlice";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { flightsSlice } from "@/lib/features/results/resultsSlice";

export const handleDetailsRedirect = async (id: string, dispatch: AppDispatch) => {
    try {
        const res = await getFlightDetails(id); 
        console.log('flight details', res); 

        try {
            dispatch(detailsSlice.actions.fetchDetailsSuccess(res))
        } catch (error) {
            dispatch(detailsSlice.actions.fetchDetailsFailure(error as string))
        }
    } catch (error) {
        console.log(error)
        toast('Something went wrong fetching flight details, please try again later')
    }
    redirect('/details')
}

export const handleReturnToSearch = async (router: AppRouterInstance , dispatch: AppDispatch) => {
    dispatch(flightsSlice.actions.resetItinerary());
    router.back()
}

