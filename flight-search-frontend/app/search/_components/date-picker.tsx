"use client";

import * as React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { handleDateChange } from "@/app/_handlers/searchComponentHandlers";
import { useState, useMemo } from "react";
import { useSearchParams } from "@/app/_hooks/useSearchParams";

export function DatePickerDemo({ departure }: { departure: boolean }) {
  const dispatch = useDispatch();
  const { departureDate, returnDate } = useSearchParams();
  
  const [date, setDate] = useState<Date | undefined>();

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0); // Reset time for correct comparison
    return date;
  }, []);
  
  const isDisabled = !departure && !departureDate;

  return (
    <>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            (!date && "text-muted-foreground"),
            isDisabled && "opacity-50 cursor-not-allowed"
          )}
          disabled={isDisabled}
        >
          <CalendarIcon />
          {
            departure 
            ? departureDate || <span>Please select departure date</span>
            : returnDate || <span>Please select return date</span>
          }
        </Button>
      </PopoverTrigger>
      {!isDisabled && (
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              setDate(selectedDate);
              handleDateChange(selectedDate, dispatch, departure, setDate); 
            }}
            initialFocus
            disabled={(day) => day < today || (!departure && !!departureDate && day < new Date(departureDate))}
          />
        </PopoverContent>
      )}
    </Popover>
    
    </>
    
  );
}