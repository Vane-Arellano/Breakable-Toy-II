'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { DatePickerDemo } from "./date-picker"
import { SelectScrollable } from "./selector"
import {redirect} from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
export function SearchForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    redirect('/results');
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Flight Search</h1>
                <p className="text-balance text-muted-foreground">
                  Welcome back!
                </p>
              </div>
              <div className="grid gap-2">
                <Label>Departure Airport</Label>
                <SelectScrollable holder='Select Departure Airport' />
              </div>
              <div className="grid gap-2">
                <Label>Arrival Airport</Label>
                <SelectScrollable holder='Select Arrival Airport' />
              </div>
              <div className="grid gap-2">
                <Label>Departure Date</Label>
                <DatePickerDemo/>
              </div>
              <div className="grid gap-2">
                <Label >Return Date</Label>
                <DatePickerDemo/>
              </div>
              <div className="grid gap-2">
                <Label >Currency</Label>
                <SelectScrollable holder='Currency'/>
              </div>
              <div className="flex flex-row gap-4">
                <Checkbox/>
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
