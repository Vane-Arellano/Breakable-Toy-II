'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { DatePickerDemo } from "./date-picker"
import { SelectScrollable } from "./airport_selector"
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { CurrencySelector } from "./currency_selector"
import { handleAdultsChange, handleSubmit } from "@/app/_handlers/searchComponentHandlers"
import { useSearchParams } from "@/app/_hooks/useSearchParams"
import { useFlightsStore } from "@/app/_hooks/useFlightsStore"
import { toast } from "sonner"
import { LoaderPinwheel } from "lucide-react"
import { Input } from "@/components/ui/input"
import { searchSlice } from "@/lib/features/search/searchSlice"
import { RootState } from "@/lib/store"

export function SearchForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { departureDate, returnDate, origin, destination, currency, adults } = useSearchParams();
  const { itineraries, errorF, loading, roundedFlights } = useFlightsStore();
  
  const nonStop = useSelector((state: RootState) => state.search.search.non_stop);

  const handleChange = (checked: boolean) => {
    dispatch(searchSlice.actions.addSearchParam({ non_stop: checked }));
  };

  const dispatch = useDispatch(); 
  const router = useRouter();

  useEffect(() => {
    if(itineraries.length > 0 || roundedFlights.length > 0){
      router.push("/results");
    } 
  }, [itineraries, roundedFlights, router])

  useEffect(() => {
    if(errorF != "") toast("There has been an error with the search, try again later")
  }, [errorF])

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Flight Search</h1>
                <p className="text-balance text-muted-foreground">
                  Welcome back!
                </p>
              </div>
              <div className="grid gap-2">
                <Label>Departure Airport</Label>
                <SelectScrollable holder='Select Departure Airport' departure={true} /> 
              </div>
              <div className="grid gap-2">
                <Label>Arrival Airport</Label>
                <SelectScrollable holder='Select Arrival Airport' departure={false} />
              </div>
              <div className="grid gap-2">
                <Label>Departure Date</Label>
                <DatePickerDemo departure={true}/>
              </div>
              <div className="grid gap-2">
                <Label>Return Date</Label>
                <DatePickerDemo departure={false}/>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col w-full gap-2">
                  <Label>Adults</Label>
                  <Input 
                    value={adults}
                    className="w-10" 
                    onChange={(e) => handleAdultsChange(e, dispatch)}
                  />
                </div>
                <div className="flex flex-col w-full gap-2">
                  <Label >Currency</Label>
                  <CurrencySelector/>
                </div>

              </div>
              <div className="flex flex-row gap-4">
                <Checkbox checked={nonStop} onCheckedChange={handleChange}/>
                <Label >Non-stop</Label>
              </div>
                
              <Button type="submit" className="w-full" disabled={loading} onClick={(e) => 
                handleSubmit(e, dispatch, {
                  departure_date: departureDate, 
                  return_date: returnDate,
                  departure_airport: origin, 
                  arrival_airport: destination, 
                  currency: currency, 
                  non_stop: nonStop, 
                  adults: adults,
                  sortBy: "", 
                  sortOrder: ""
                })}>
                { 
                  loading ? <LoaderPinwheel/> : "Search"
                }
              </Button>
            </div>
          </form>
          <div className="relative hidden bg-white md:block">
            <video 
              autoPlay
              loop
              muted
              playsInline
              className="h-full"
            >
              <source src="https://cdn.dribbble.com/userupload/40446585/file/original-580c576cda5a31fe3fe597a3faba6f50.mp4" type="video/mp4"/>
            </video>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
