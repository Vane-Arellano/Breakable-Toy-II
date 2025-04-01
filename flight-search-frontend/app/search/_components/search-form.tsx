'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { DatePickerDemo } from "./date-picker"
import { SelectScrollable } from "./airport_selector"
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { FlightSearch } from "@/app/_interfaces/flight-search"
import { searchInitialState } from "@/lib/features/search/searchState"
import { CurrencySelector } from "./currency_selector"
import { handleNonStop, handleSubmit } from "@/app/_handlers/searchComponentHandlers"
import { useSearchParams } from "@/app/_hooks/useSearchParams"

export function SearchForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [searchParams] = useState<Partial<FlightSearch>>(searchInitialState);
  const [nonStop] = useState<number>(0);
  const { departureDate, returnDate, origin, destination, currency, nonStopS } = useSearchParams();

  const dispatch = useDispatch(); 
  const router = useRouter();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={(e) => 
            handleSubmit(e, searchParams, dispatch, router, {
              departure_date: departureDate, 
              return_date: returnDate,
              departure_airport: origin, 
              arrival_airport: destination, 
              currency: currency, 
              non_stop: nonStopS
            })}>
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
              <div className="grid gap-2">
                <Label >Currency</Label>
                <CurrencySelector/>
              </div>
              <div className="flex flex-row gap-4">
                <Checkbox value={nonStop} onChange={() => handleNonStop(nonStop, dispatch)}/>
                <Label >Non-stop</Label>
              </div>
              <Button type="submit" className="w-full">
                Search
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
