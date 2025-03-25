'use client'

import { PriceBreakdown } from "./price-breakdown"
import { CustomSeparator } from "./separator"
import { PerTraveler } from "./price-per-traveler"
import { SegmentList } from "./segment-list"

export const FlightDetails = () => {
  return (
    <div className="flex flex-row p-10 h-full bg-white rounded-lg gap-4">
        <div className=" rounded-lg w-3/4 overflow-y-scroll">
            <SegmentList/> 
        </div>
        <div className="w-1/4 bg-zinc-100/50 p-10 flex flex-col justify-between">
            <PriceBreakdown/> 
            <CustomSeparator/> 
            <PerTraveler/>
        </div>
    </div>
  )

}